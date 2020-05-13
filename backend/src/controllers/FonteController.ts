import { Request, Response, Router } from 'express'

import Fonte from '../models/Fonte'

import getFilters from './utils/getFilters'
import { queryFonte } from './utils/queries'

class FonteController {
    public path = '/fontes'
    public routes = Router()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.routes.get(`${this.path}`, this.index)
        this.routes.get(`${this.path}/:id`, this.show)
    }

    public async index (req: Request, res: Response): Promise<Response> {
        try {
            const filters = await getFilters(Fonte, ['fabricante', 'tipo', 'certificado'])

            const {
                page = 1,
                limit = 10,
                precoMin = 0,
                precoMax = 50000,
                potenciaMin = 0,
                potenciaMax = 1000,
                fanless = 'true,false',
                modular = 'true,false,full',
                fabricante = filters.fabricante,
                tipo = filters.tipo,
                certificado = filters.certificado,
                ordenar = '',
                buscar = ''
            } = req.query as any

            const query = queryFonte(precoMin,precoMax,potenciaMin,potenciaMax,fanless,modular,fabricante,tipo,certificado,buscar)

            const options = {
                page,
                limit,
                select: '',
                sort: ordenar
            }
            
            const fontes = await Fonte.paginate(query, options)

            return res.json({ fontes, filters })
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }

    public async show (req: Request, res: Response): Promise<Response> {
        try {

            const { id } = req.params

            const fonte =  await Fonte.findOne({ _id: id }).populate('lojas.idLoja')
            
            return res.json(fonte)
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }
}

export default new FonteController()