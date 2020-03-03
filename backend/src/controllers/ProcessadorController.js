const Processador = require('../models/Processador')
const Loja = require('../models/Loja')

const { queryProcessador } = require('./utils/queries')

module.exports = {
    async index(req, res){
        try{

            const {
                page,
                limit = 10,
                precoMin = 0,
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
                select: '-arquitetura -thread -litografia -lojas.idLoja -lojas.urlProduto -lojas._id',
                sort: `lojas.preco ${ordenar}`
            }

            const processadores = await Processador.paginate(query, options)

            return res.json(processadores)

        }catch(err){
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
        }



    },

    async show(req, res){
        try{

            const processadores = await Processador.findById(req.params.id).populate('lojas.idLoja').exec()

            return res.json(processadores)

        }catch(err){
            
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
            
        }
    },

    async store(req, res){
        try{

            const jsonProdutos = JSON.parse(req.body.jsonProdutos)
            const idLoja = req.headers.idloja

            let processadores = []
            
            const numDocumentos = await Processador.estimatedDocumentCount()
            
            for(let i = 0; i < numDocumentos;i++){
                    
                if(jsonProdutos[i]){
                    
                    var verificaModelo = await Processador.countDocuments({ modelo: `${jsonProdutos[i].modelo}` })
                    var verificaIdLoja = await Processador.countDocuments({
                        $and: [
                            { modelo: `${jsonProdutos[i].modelo}`},
                            { lojas: { $elemMatch: { idLoja: { $eq: `${idLoja}`} } } }
                        ]
                    })

                    if(verificaModelo == 0){
                        
                        processadores.push(
                            await Processador.create({
                                imagem: jsonProdutos[i].imagem,
                                nome: jsonProdutos[i].nome,
                                modelo: jsonProdutos[i].modelo,
                                fabricante: jsonProdutos[i].fabricante,
                                serie: jsonProdutos[i].serie,
                                familia: jsonProdutos[i].familia,
                                socket: jsonProdutos[i].socket,
                                graficos_integrados: jsonProdutos[i].graficos_integrados,
                                nucleo: jsonProdutos[i].nucleo,
                                frequencia: jsonProdutos[i].frequencia,
                                frequencia_turbo: jsonProdutos[i].frequencia_turbo,
                                consumo: jsonProdutos[i].consumo,
                                arquitetura: jsonProdutos[i].arquitetura,
                                thread: jsonProdutos[i].thread,
                                litografia: jsonProdutos[i].litografia,
                                cooler_incluso: jsonProdutos[i].cooler_incluso,
                                multithreading: jsonProdutos[i].multithreading,
                                suporte_ecc: jsonProdutos[i].suporte_ecc,
                                virtualizacao: jsonProdutos[i].virtualizacao,
                                lojas: [{
                                    idLoja,
                                    preco: jsonProdutos[i].preco,
                                    urlProduto: jsonProdutos[i].urlProduto
                                }]                            
                            })
                        )
                        console.log('cadastrou')
                        
                    }else if(verificaModelo == 1 && verificaIdLoja == 0){

                        processadores.push(
                            await Processador.findOneAndUpdate(
                                {
                                    $and: [
                                        { modelo: `${jsonProdutos[i].modelo}`},
                                        { lojas: { $elemMatch: { idLoja: { $ne: `${idLoja}`} } } }
                                    ]
                                },
                                { 
                                    $push: { 
                                        lojas: {
                                            $each:[{
                                                idLoja,
                                                preco: jsonProdutos[i].preco,
                                                urlProduto: jsonProdutos[i].urlProduto
                                            }],
                                            $sort: { preco: 1 }
                                        }
                                    }
                                },
                                {new: true}
                            )
                        )
                        console.log('atualizou')

                    }else if(verificaModelo == 1 && verificaIdLoja == 1){
                        processadores.push('produto ja cadastrado pela loja')
                    }else{
                        processadores.push('algo está errado no banco de dados')
                    }

                }

            }

            return res.json(processadores)

        }catch(err){
            
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    },

    async update(req, res){
        try{

            const { preco, urlProduto } = req.body
            const idLoja = req.headers.idloja
            const { id } = req.params



            const processadores = await Processador.findOneAndUpdate(
                { $and: [
                    { _id: id },
                    { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                ]},
                { $set: {
                    'lojas.$.preco': preco,
                    'lojas.$.urlProduto': urlProduto
                }},
                { new: true, omitUndefined: true }
            )
                    
            res.send(processadores)
            
        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    },

    async destroy(req, res){
        try{

            const idLoja = req.headers.idloja
            const { id } = req.params

            const numArrayLojas = await Processador.countDocuments( { $and: [ { _id: id }, { 'lojas.1': {$exists: true} } ] } )

            if (numArrayLojas == 0){

                var processadores = await Processador.deleteOne(
                    { $and: [
                        { _id: id },
                        { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                    ]}
                )

            }else if (numArrayLojas == 1){
                
                var processadores = await Processador.findOneAndUpdate(
                    { _id: id },
                    { $pull: { lojas: { idLoja: idLoja } } },
                    { new: true, omitUndefined: true }
                )

            }else{

                var processadores = 'algo está errado no banco de dados'

            }

            res.send(processadores)

        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    }

}