const PlacaVideo = require('../models/PlacaVideo')
const Loja = require('../models/Loja')

const { queryPlacaVideo } = require('./utils/queries')

module.exports = {
    async index(req, res){
        try{
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
                ledRgb = 'true,false',
                fabricante = 'ASRock,Asus,EVGA,GALAX,Gigabyte',
                serie = 'GeForce 1000 Series,Phantom Gaming,Dual,Gaming,OC,ROG Strix,',
                chipset = 'GeForce GTX 1050 Ti,Radeon RX 580,GeForce RTX 2060,GeForce GTX 1660,GeForce GTX 1660 Ti,Radeon RX 580,GeForce RTX 2080 Ti,GeForce GTX 1060,GeForce GTX 1050,GeForce GTX 1650',
                interface = 'PCI-Express x16',
                crossfire = 'Não possui,4-Way CrossFire',
                cor = 'Cinza,Preto,Preto/Cinza,Preto/Laranja,Preto/Prata,Preto/Branco',
                ordenar = '',
                buscar = '',
            } = req.query

            const query = queryPlacaVideo(precoMin,precoMax,memoriaMin,memoriaMax,clockMin,clockMax,comprimentoMin,comprimentoMax,dviMin,dviMax,hdmiMin,hdmiMax,mhdmiMin,mhdmiMax,displayMin,displayMax,mdisplayMin,mdisplayMax,slotMin,slotMax,consumoMin,consumoMax,fanless,watercooler,gsync,ledRgb,fabricante,serie,chipset,interface,crossfire,cor,buscar)

            const options = {
                page,
                limit,
                select: {
                    tipo_memoria: 0,
                    lojas: 0,
                    urlProduto: 0
                },
                sort: ordenar
            }

            const placasDeVideo = await PlacaVideo.paginate(query, options)

            return res.json(placasDeVideo)

        }catch(err){
            
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
        }

    },

    async show(req, res){
        try{

            const placasDeVideo = await PlacaVideo.findById(req.params.id).populate('lojas').exec()

            return res.json(placasDeVideo)

        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
            
        }        
    }
}