import { Request, Response, Router } from 'express'

import PlacaMae from '../models/PlacaMae'

import getFilters from './utils/getFilters'
import { queryPlacaMae } from './utils/queries'

class PlacaMaeController {
    public path = '/placas-mae'
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
            const filters = await getFilters(PlacaMae, ['fabricante', 'socket', 'formato', 'chipset', 'crossfire', 'tipo_memoria', 'cor'])

            const {
                page = 1,
                limit = 10,
                precoMin = 0,
                precoMax = 50000,
                portasSata3Min = 0,
                portasSata3Max = 50,
                portasSata6Min = 0,
                portasSata6Max = 100,
                portasSataExpMin = 0,
                portasSataExpMax = 10000,
                portasM2Min = 0,
                portasM2Max = 100,
                portasMSataMin = 0,
                portasMSataMax = 100,
                slotsRamMin = 0,
                slotsRamMax = 100,
                ramMaxMin = 0,
                ramMaxMax = 100,
                slotsPcieX16Min = 0,
                slotsPcieX16Max = 100,
                slotsPcieX4Min = 0,
                slotsPcieX4Max = 50,
                slotsPcieX1Min = 0,
                slotsPcieX1Max = 800,
                slotsPciMin = 0,
                slotsPciMax = 100,
                portasEthernetMin = 0,
                portasEthernetMax = 50,
                usb2Min = 0,
                usb2Max = 800,
                usb3Min = 0,
                usb3Max = 800,
                usb31Min = 0,
                usb31Max = 800,
                usbTypec = 'true,false',
                videoOnboard = 'true,false',
                suporteEcc = 'true,false',
                redeWireless = 'true,false',
                bluetooth = 'true,false',
                fabricante = filters.fabricante,
                socket = filters.socket,
                formato = filters.formato,
                chipset = filters.chipset,
                crossfire = filters.crossfire,
                tipo_memoria = filters.tipo_memoria,
                cor = filters.cor,
                ordenar = '',
                buscar = ''
            } = req.query as any

            const query = queryPlacaMae(precoMin,precoMax,portasSata3Min,portasSata3Max,portasSata6Min,portasSata6Max,portasSataExpMin,portasSataExpMax,portasM2Min,portasM2Max,portasMSataMin,portasMSataMax,slotsRamMin,slotsRamMax,ramMaxMin,ramMaxMax,slotsPcieX16Min,slotsPcieX16Max,slotsPcieX4Min,slotsPcieX4Max,slotsPcieX1Min,slotsPcieX1Max,slotsPciMin,slotsPciMax,portasEthernetMin,portasEthernetMax,usb2Min,usb2Max,usb3Min,usb3Max,usb31Min,usb31Max,usbTypec,videoOnboard,suporteEcc,redeWireless,bluetooth,fabricante,socket,formato,chipset,crossfire,tipo_memoria,cor,buscar)

            const options = {
                page,
                limit,
                select: '',
                sort: ordenar
            }
            
            const placasMae = await PlacaMae.paginate(query, options)

            return res.json({ placasMae, filters })
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }

    public async show (req: Request, res: Response): Promise<Response> {
        try {

            const { id } = req.params

            const placaMae =  await PlacaMae.findOne({ _id: id }).populate('lojas.idLoja')
            
            return res.json(placaMae)
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }
}

export default new PlacaMaeController()