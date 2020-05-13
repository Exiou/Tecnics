import { Request, Response, Router } from 'express'

import Cooler from '../models/Cooler'

import getFilters from './utils/getFilters'
import { queryCooler } from './utils/queries'

class CoolerController {
    public path = '/coolers'
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
            const filters = await getFilters(Cooler, ['fabricante', 'rolamento', 'socket', 'radiador', 'cor'])

            const {
                page = 1,
                limit = 10,
                precoMin = 0,
                precoMax = 50000,
                alturaMin = 0,
                alturaMax = 1000,
                fanless = 'true,false',
                fabricante = filters.fabricante,
                rolamento = filters.rolamento,
                socket = filters.socket,
                radiador = filters.radiador,
                cor = filters.cor,
                ordenar = '',
                buscar = ''
            } = req.query as any

            const query = queryCooler(precoMin,precoMax,alturaMin,alturaMax,fanless,fabricante,rolamento,socket,radiador,cor,buscar)

            const options = {
                page,
                limit,
                select: '',
                sort: ordenar
            }
            
            const coolers = await Cooler.paginate(query, options)

            return res.json({ coolers, filters })
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }

    public async show (req: Request, res: Response): Promise<Response> {
        try {

            const { id } = req.params

            const cooler =  await Cooler.findOne({ _id: id }).populate('lojas.idLoja')
            
            return res.json(cooler)
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }
}

export default new CoolerController()