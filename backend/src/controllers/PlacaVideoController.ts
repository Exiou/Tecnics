import { Request, Response, Router } from 'express'

import PlacaVideo from '../models/PlacaVideo'

import getFilters from './utils/getFilters'
import { queryPlacaVideo } from './utils/queries'

class PlacaVideoController {
    public path = '/placas-video'
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
            const filters = await getFilters(PlacaVideo, ['fabricante', 'serie', 'chipset', 'interface', 'sli_crossfire', 'cor'])

            const {
                page = 1,
                limit = 10,
                precoMin = 0,
                precoMax = 50000,
                memoriaMin = 0,
                memoriaMax = 50,
                clockMin = 0,
                clockMax = 100,
                comprimentoMin = 0,
                comprimentoMax = 10000,
                dviMin = 0,
                dviMax = 100,
                hdmiMin = 0,
                hdmiMax = 100,
                mhdmiMin = 0,
                mhdmiMax = 100,
                displayMin = 0,
                displayMax = 100,
                mdisplayMin = 0,
                mdisplayMax = 100,
                slotMin = 0,
                slotMax = 50,
                consumoMin = 0,
                consumoMax = 800,
                fanless = 'true,false',
                watercooler = 'true,false',
                gsync = 'true,false',
                fabricante = filters.fabricante,
                serie = filters.serie,
                chipset = filters.chipset,
                interfacepv = filters.interface,
                crossfire = filters.sli_crossfire,
                cor = filters.cor,
                ordenar = '',
                buscar = ''
            } = req.query as any

            const query = queryPlacaVideo(precoMin,precoMax,memoriaMin,memoriaMax,clockMin,clockMax,comprimentoMin,comprimentoMax,dviMin,dviMax,hdmiMin,hdmiMax,mhdmiMin,mhdmiMax,displayMin,displayMax,mdisplayMin,mdisplayMax,slotMin,slotMax,consumoMin,consumoMax,fanless,watercooler,gsync,fabricante,serie,chipset,interfacepv,crossfire,cor,buscar)

            const options = {
                page,
                limit,
                select: '',
                sort: ordenar
            }
            
            const placasVideo = await PlacaVideo.paginate(query, options)

            return res.json({ placasVideo, filters })
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }

    public async show (req: Request, res: Response): Promise<Response> {
        try {

            const { id } = req.params

            const placaVideo =  await PlacaVideo.findOne({ _id: id }).populate('lojas.idLoja')
            
            return res.json(placaVideo)
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }
}

export default new PlacaVideoController()