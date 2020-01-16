const Processador = require('../models/Processador')
const Loja = require('../models/Loja')

module.exports = {
    async index(req, res){
        try{
        const {
            page = 1,
            limit = 10,
            precoMin = 299.9,
            precoMax = 3322.24,
            nucleoMin = 2,
            nucleoMax = 8,
            freqMin = 2.9,
            freqMax = 3.7,
            consumoMin = 58,
            consumoMax = 105,
            cooler = 'true,false',
            multithreading = 'true,false',
            ecc = 'true,false',
            virtualizacao = 'true,false',
            fabricante = 'AMD,Intel',
            serie = 'Core i3,Core i5,Core i7,Core i9,FX,Pentium,Ryzen 3,Ryzen 5,Ryzen 7,Ryzen 9',
            familia = 'Coffee Lake Refresh,Coffee Lake-S,Kaby Lake,Pinnacle Ridge,Raven Ridge,Vishera',
            socket = 'AM3+,AM4,LGA 1151',
            graficos = 'Não possui,HD Graphics 630,Intel UHD Graphics 630,Radeon Vega Graphics',
            ordenar = '',
            buscar = '',
        } = req.query

        const coolerArray = cooler.split(',').map(cooler => cooler.trim())
        const multithreadingArray = multithreading.split(',').map(multithreading => multithreading.trim())
        const eccArray = ecc.split(',').map(ecc => ecc.trim())
        const virtualizacaoArray = virtualizacao.split(',').map(virtualizacao => virtualizacao.trim())
        const fabArray = fabricante.split(',').map(fabricante => fabricante.trim())
        const serieArray = serie.split(',').map(serie => serie.trim())
        const famArray = familia.split(',').map(familia => familia.trim())
        const socketArray = socket.split(',').map(socket => socket.trim())
        const grafArray = graficos.split(',').map(graficos => graficos.trim())

        const query = {
            $and: [
                { nome: { $regex: `${buscar}`, $options: 'i' } },
                { preco: { $gte: precoMin }},
                { preco: { $lte: precoMax }},
                { nucleo: { $gte: nucleoMin }},
                { nucleo: { $lte: nucleoMax }},
                { frequencia: { $gte: freqMin }},
                { frequencia: { $lte: freqMax }},
                { consumo: { $gte: consumoMin }},
                { consumo: { $lte: consumoMax }},
                { cooler_incluso: { $in: coolerArray }},
                { multithreading: { $in: multithreadingArray }},
                { suporte_ecc: { $in: eccArray }},
                { virtualizacao: { $in: virtualizacaoArray }},
                { fabricante: { $in: fabArray }},
                { serie: { $in: serieArray }},
                { familia: { $in: famArray }},
                { socket: { $in: socketArray }},
                { graficos_integrados: { $in: grafArray }},
            ]
        }
        
        const options = {
            page,
            limit,
            select: {
                arquitetura: 0,
                thread: 0,
                litografia: 0,
                lojas: 0,
                urlProduto: 0
            },
            sort: ordenar
        }

        const processadores = await Processador.paginate(query, options)

        return res.json(processadores)

    }catch(err){
        return res.send(`Deu erro, ${err}`)
    }



    },

    async show(req, res){
        try{

            const processadores = await Processador.findById(req.params.id).populate('lojas').exec()

            return res.json(processadores)

        }catch(err){
            return res.send(`Deu erro, ${err}`)
            
        }
    }
}