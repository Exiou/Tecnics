const Processador = require('../models/Processador')
const Loja = require('../models/Loja')

const { queryProcessador } = require('./utils/queries')

module.exports = {
    async index(req, res){
        try{

            const {
                page,
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
                buscar = ''
            } = req.query

            const query = queryProcessador(buscar,precoMin,precoMax,nucleoMin,nucleoMax,freqMin,freqMax,consumoMin,consumoMax,cooler,multithreading,ecc,virtualizacao,fabricante,serie,familia,socket,graficos)

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
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
        }



    },

    async show(req, res){
        try{

            const processadores = await Processador.findById(req.params.id).populate('lojas').exec()

            return res.json(processadores)

        }catch(err){
            
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
            
        }
    }
}