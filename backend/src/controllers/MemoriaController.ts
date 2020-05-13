import { Request, Response, Router } from 'express'

import Memoria from '../models/Memoria'

import getFilters from './utils/getFilters'
import { queryMemoria } from './utils/queries'

class MemoriaController {
    public path = '/memorias'
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
            const filters = await getFilters(Memoria, ['fabricante', 'velocidade', 'tipo', 'capacidade', 'cor'])

            const {
                page = 1,
                limit = 10,
                precoMin = 0,
                precoMax = 50000,
                voltagemMin = 0,
                voltagemMax = 10000,
                cas_latencyMin = 0,
                cas_latencyMax = 10000,
                suporte_ecc = 'true,false',
                registrada = 'true,false',
                dissipador = 'true,false',
                fabricante = filters.fabricante,
                velocidade = filters.velocidade,
                tipo = filters.tipo,
                capacidade = filters.capacidade,
                cor = filters.cor,
                ordenar = '',
                buscar = ''
            } = req.query as any

            const query = queryMemoria(precoMin,precoMax,voltagemMin,voltagemMax,cas_latencyMin,cas_latencyMax,suporte_ecc,registrada,dissipador,fabricante,velocidade,tipo,capacidade,cor,buscar)

            const options = {
                page,
                limit,
                select: '',
                sort: ordenar
            }
            
            const memorias = await Memoria.paginate(query, options)

            return res.json({ memorias, filters })
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }

    public async show (req: Request, res: Response): Promise<Response> {
        try {

            const { id } = req.params

            const memoria =  await Memoria.findOne({ _id: id }).populate('lojas.idLoja')
            
            return res.json(memoria)
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }
}

export default new MemoriaController()