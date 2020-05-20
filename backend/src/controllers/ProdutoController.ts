import { Request, Response, Router, NextFunction } from 'express'

import switchModel from './utils/switchModel'
import { queryProduto } from './utils/queries'
import { PaginateModel } from 'mongoose'
import { IProduto } from '../models/interfaces/produtoInterface'
import HttpException from '../exceptions/HttpException'
import modelSpecs from './utils/modelSpecs'

class ProdutoController {
    public path = '/produtos'
    public routes = Router()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.routes.get(`${this.path}/:model`, this.index)
        this.routes.get(`${this.path}/:model/:id`, this.show)
    }

    public async index (req: Request, res: Response, next: NextFunction) {
        try {
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

            const query = queryProduto(req.query, paths, precoMin, precoMax, buscarNome, buscarModelo)

            const options = {
                page,
                limit,
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

            const { id } = req.params

            const model: PaginateModel<IProduto> = (await switchModel(req.params.model))!

            const produto =  await model.findOne({ _id: id }).populate('lojas.idLoja')
            
            return res.json(produto)
            
        } catch (err) {
            next(new HttpException(404, `Ocorreu um erro na requisição: ${err}`))
        }
    }
}

export default new ProdutoController()