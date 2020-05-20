import { Request, Response, Router, NextFunction } from 'express'
import multer from 'multer'

import uploadConfig from '../config/multer'

import switchModel from './utils/switchModel'
import { queryLoja } from './utils/queries'
import { PaginateModel } from 'mongoose'
import { IProduto } from '../models/interfaces/produtoInterface'
import HttpException from '../exceptions/HttpException'
import modelSpecs from './utils/modelSpecs'

class LojaController {
    public path = '/lojas'
    public routes = Router()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.routes.get(`${this.path}/:model`, this.index)
        this.routes.get(`${this.path}/:model/:id`, this.show)
        this.routes.post(`${this.path}/:model`, multer(uploadConfig('processadores')).array('files'), this.store)
        this.routes.put(`${this.path}/:model/:id`, this.update)
        this.routes.delete(`${this.path}/:model/:id`, this.destroy)
    }

    public async index (req: Request, res: Response, next: NextFunction) {
        try {

            const idLoja = req.headers.idloja

            const model: PaginateModel<IProduto> = (await switchModel(req.params.model))!

            const { filters, paths } = await modelSpecs(model)

            const {
                page = 1,
                limit = 10,
                precoMin = 0,
                precoMax = 50000,
                buscarNome = '',
                buscarModelo = '',
                ordenar = ''
            } = req.query as any

            const query = queryLoja(req.query, paths, precoMin, precoMax, buscarNome, buscarModelo, idLoja)

            const options = {
                page,
                limit,
                select: {lojas: { $elemMatch: { idLoja: idLoja }}},
                sort: ordenar
            }


            const produtos = await model.paginate(query, options)

            return res.json({ produtos, filters })

        } catch (err) {
            next(new HttpException(404, `Ocorreu um erro na requisição: ${err}`))
        }
    }

    public async show (req: Request, res: Response, next: NextFunction) {
        try {

            const idLoja = req.headers.idloja
            const { id } = req.params

            const model: PaginateModel<IProduto> = (await switchModel(req.params.model))!

            const produto =  await model.findOne({
                $and: [
                    { _id: id },
                    { lojas: { $elemMatch: { idLoja: idLoja } } }
                ]
            }, {lojas: { $elemMatch: { idLoja: idLoja }}}).populate('lojas.idLoja')
            
            return res.json(produto)
            
        } catch (err) {
            next(new HttpException(404, `Ocorreu um erro na requisição: ${err}`))
        }
    }

    public async store (req: Request, res: Response, next: NextFunction) {
        try {

            const produto = JSON.parse(req.body.produto)
            const idLoja = req.headers.idloja?.toString()!

            const model: PaginateModel<IProduto> = (await switchModel(req.params.model))!

            if(produto.lojas){
                let verificaModelo = await model.countDocuments({ modelo: produto.modelo })
                let verificaIdLoja = await model.countDocuments({
                    $and: [
                        { modelo: `${produto.modelo}`},
                        { lojas: { $elemMatch: { idLoja: { $eq: `${idLoja}`} } } }
                    ]
                })
                
                produto.lojas[0].idLoja = idLoja

                if(verificaModelo == 0)return res.json(await model.create(produto))

                else if(verificaModelo == 1 && verificaIdLoja == 0) {
                   return res.json(
                        await model.findOneAndUpdate(
                            {
                                $and: [
                                    { modelo: produto.modelo },
                                    { lojas: { $elemMatch: { idLoja: { $ne: idLoja} } } }
                                ]
                            },
                            {
                                $push: {
                                    lojas: {
                                        $each: [{
                                            idLoja,
                                            preco: produto.lojas[0].preco,
                                            urlProduto: produto.lojas[0].urlProduto
                                        }],
                                        $sort: { preco: 1 }
                                    }
                                }
                            },
                            { new: true }
                        )
                    )
                }

                else if(verificaModelo == 1 && verificaIdLoja == 1)return res.json('produto já cadastrado pela loja')

                else{
                    next(new HttpException(500, `Ocorreu um erro na requisição: database error`))
                }
            }else {           
                next(new HttpException(500, `Ocorreu um erro na requisição: database error`))
            }
        } catch (err) {
            next(new HttpException(404, `Ocorreu um erro na requisição: ${err}`))
        }
    }

    public async update (req: Request, res: Response, next: NextFunction) {
        try {

            const { preco, urlProduto } = req.body
            const idLoja = req.headers.idloja
            const { id } = req.params

            const model: PaginateModel<IProduto> = (await switchModel(req.params.model))!

            await model.updateOne(
                { $and: [
                    { _id: id },
                    { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                ]},
                { $set: {
                    'lojas.$.preco': preco,
                    'lojas.$.urlProduto': urlProduto
                }},
                { omitUndefined: true }
            )

            const produto = await model.findOneAndUpdate(
                { $and: [
                    { _id: id },
                    { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                ]},
                { $push: { lojas: { $each: [], $sort: { preco: 1 } } } },
                { new: true }
            )
            
            return res.json(produto)
        } catch (err) {
            next(new HttpException(404, `Ocorreu um erro na requisição: ${err}`))
        }
    }

    public async destroy (req: Request, res: Response, next: NextFunction) {
        try {

            const idLoja: any = req.headers.idloja
            const { id } = req.params
            
            const model: PaginateModel<IProduto> = (await switchModel(req.params.model))!

            const numArrayLojas = await model.countDocuments( { $and: [ { _id: id }, { 'lojas.1': {$exists: true} } ] } )

            let produto

            if (numArrayLojas == 0){
                produto = await model.findOne(
                    { $and: [
                        { _id: id },
                        { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                    ]}
                )

                produto?.remove()
            }else if (numArrayLojas == 1){
                produto = await model.findOneAndUpdate(
                    { _id: id },
                    { $pull: { lojas: { idLoja: idLoja } } },
                    { new: true, omitUndefined: true }
                )
            }else{
                produto = 'algo está errado no banco de dados'
            }


            return res.json(produto)
        } catch (err) {
            next(new HttpException(404, `Ocorreu um erro na requisição: ${err}`))
        }
    }
}

export default new LojaController()