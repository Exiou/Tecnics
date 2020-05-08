import { Request, Response, Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/multer'

import switchModel from './utils/switchModel'
import getFilters from './utils/getFilters'
import { queryLoja } from './utils/queries'

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

    public async index (req: Request, res: Response): Promise<Response> {
        try {

            const idLoja = req.headers.idloja

            const model = (await switchModel(req.params.model))!

            const filters = await getFilters(model, ['fabricante'])

            const { 
                page= 1,
                limit = 10,
                precoMin = 0,
                precoMax = 50000,
                fabricante = filters.fabricante,
                ordenar = '',
                buscar = ''
            } = req.query as any

            const query = queryLoja(buscar,precoMin,precoMax,fabricante, idLoja)

            const options = {
                page,
                limit,
                select: '',
                sort: ordenar
            }

            const produtos = await model.paginate(query, options)

            return res.json({ produtos, filters })

        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }

    public async show (req: Request, res: Response): Promise<Response> {
        try {

            const idLoja = req.headers.idloja
            const { id } = req.params

            const model = (await switchModel(req.params.model))!

            const produto =  await model.findOne({
                $and: [
                    { _id: id },
                    { lojas: { $elemMatch: { idLoja: idLoja } } }
                ]
            }).populate('lojas.idLoja')
            
            return res.json(produto)
            
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }

    public async store (req: Request, res: Response): Promise<Response> {
        try {

            const jsonProdutos: any[] = JSON.parse(req.body.jsonProdutos)
            const idLoja = req.headers.idloja?.toString()!

            const model = (await switchModel(req.params.model))!

            let produtos = []

            for await (let produto of jsonProdutos){
                if(produto.lojas){
                    let verificaModelo = await model.countDocuments({ modelo: produto.modelo })
                    let verificaIdLoja = await model.countDocuments({
                        $and: [
                            { modelo: `${produto.modelo}`},
                            { lojas: { $elemMatch: { idLoja: { $eq: `${idLoja}`} } } }
                        ]
                    })
                    
                    produto.lojas[0].idLoja = idLoja

                    if(verificaModelo == 0) produtos.push(await model.create(produto))

                    else if(verificaModelo == 1 && verificaIdLoja == 0) {
                        produtos.push(
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

                    else if(verificaModelo == 1 && verificaIdLoja == 1) produtos.push('produto já cadastrado pela loja')

                    else{
                        produtos.push('algo está errado no banco de dados')
                    }
                }
            }

            return res.json(produtos)
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }

    public async update (req: Request, res: Response): Promise<Response> {
        try {

            const { preco, urlProduto } = req.body
            const idLoja = req.headers.idloja
            const { id } = req.params

            const model = (await switchModel(req.params.model))!

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
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }

    public async destroy (req: Request, res: Response): Promise<Response> {
        try {

            const idLoja: any = req.headers.idloja
            const { id } = req.params
            
            const model = (await switchModel(req.params.model))!

            const numArrayLojas = await model.countDocuments( { $and: [ { _id: id }, { 'lojas.1': {$exists: true} } ] } )

            let produto

            if (numArrayLojas == 0){
                produto = await model.deleteOne(
                    { $and: [
                        { _id: id },
                        { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                    ]}
                )
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
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }
}

export default new LojaController()