import { Request, Response, Router } from 'express'

import Armazenamento from '../models/Armazenamento'

import getFilters from './utils/getFilters'
import { queryArmazenamento } from './utils/queries'

class ArmazenamentoController {
    public path = '/armazenamentos'
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
            const filters = await getFilters(Armazenamento, ['fabricante', 'tipo', 'interface', 'formato', 'buffer_cache'])

            const {
                page = 1,
                limit = 10,
                precoMin = 0,
                precoMax = 50000,
                capacidadeMin = 0,
                capacidadeMax = 1000,
                intellipower = 'true,false',
                hibrido = 'true,false',
                fabricante = filters.fabricante,
                tipo = filters.tipo,
                interfaceam = filters.interface,
                formato = filters.formato,
                buffer_cache = filters.buffer_cache,
                ordenar = '',
                buscar = ''
            } = req.query as any

            const query = queryArmazenamento(precoMin,precoMax,capacidadeMin,capacidadeMax,intellipower,hibrido,fabricante,tipo,interfaceam,formato,buffer_cache,buscar)

            const options = {
                page,
                limit,
                select: '',
                sort: ordenar
            }
            
            const armazenamentos = await Armazenamento.paginate(query, options)

            return res.json({ armazenamentos, filters })
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }

    public async show (req: Request, res: Response): Promise<Response> {
        try {

            const { id } = req.params

            const armazenamento =  await Armazenamento.findOne({ _id: id }).populate('lojas.idLoja')
            
            return res.json(armazenamento)
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }
}

export default new ArmazenamentoController()