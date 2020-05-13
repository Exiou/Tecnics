import { Request, Response, Router } from 'express'

import Gabinete from '../models/Gabinete'

import getFilters from './utils/getFilters'
import { queryGabinete } from './utils/queries'

class GabineteController {
    public path = '/gabinetes'
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
            const filters = await getFilters(Gabinete, ['fabricante', 'tipo', 'cor'])

            const {
                page = 1,
                limit = 10,
                precoMin = 0,
                precoMax = 50000,
                baia_externa_525Min = 0,
                baia_externa_525Max = 20,
                baia_externa_350Min = 0,
                baia_externa_350Max = 20,
                baia_interna_350Min = 0,
                baia_interna_350Max = 20,
                baia_interna_250Min = 0,
                baia_interna_250Max = 20,
                fonte = 'true,false',
                janela_lateral = 'true,false',
                painel_frontal_usb3 = 'true,false',
                filtro_removivel = 'true,false',
                fabricante = filters.fabricante,
                tipo = filters.tipo,
                cor = filters.cor,
                ordenar = '',
                buscar = ''
            } = req.query as any

            const query = queryGabinete(precoMin,precoMax,baia_externa_525Min,baia_externa_525Max,baia_externa_350Min,baia_externa_350Max,baia_interna_350Min,baia_interna_350Max,baia_interna_250Min,baia_interna_250Max,fonte,janela_lateral,painel_frontal_usb3,filtro_removivel,fabricante,tipo,cor,buscar)

            const options = {
                page,
                limit,
                select: '',
                sort: ordenar
            }
            
            const gabinetes = await Gabinete.paginate(query, options)

            return res.json({ gabinetes, filters })
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }

    public async show (req: Request, res: Response): Promise<Response> {
        try {

            const { id } = req.params

            const gabinete =  await Gabinete.findOne({ _id: id }).populate('lojas.idLoja')
            
            return res.json(gabinete)
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }
}

export default new GabineteController()