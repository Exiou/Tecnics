const Memoria = require('../models/Memoria')
const Loja = require('../models/Loja')

const { queryMemoria } = require('./utils/queries')

module.exports = {
    async index(req, res){
        try{

            const fabricanteFiltro = await (await Memoria.find().distinct('fabricante')).toString(),
                velocidadeFiltro = await (await Memoria.find().distinct('velocidade')).toString(),
                tipoFiltro = await (await Memoria.find().distinct('tipo')).toString(),
                capacidadeFiltro = await (await Memoria.find().distinct('capacidade')).toString(),
                corFiltro = await (await Memoria.find().distinct('cor')).toString()

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
                fabricante = fabricanteFiltro,
                velocidade = velocidadeFiltro,
                tipo = tipoFiltro,
                capacidade = capacidadeFiltro,
                cor = corFiltro,
                ordenar = '',
                buscar = '',
            } = req.query

            const query = queryMemoria(precoMin,precoMax,voltagemMin,voltagemMax,cas_latencyMin,cas_latencyMax,suporte_ecc,registrada,dissipador,fabricante,velocidade,tipo,capacidade,cor,buscar)

            const options = {
                page,
                limit,
                select: '-modulo -lojas.idLoja -lojas.urlProduto -lojas._id',
                sort: `${ordenar}`
            }

            const memorias = await Memoria.paginate(query, options)

            return res.json({ memorias, filtros: { fabricanteFiltro, velocidadeFiltro, tipoFiltro, capacidadeFiltro, corFiltro } })

        }catch(err){
            
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
        }

    },

    async show(req, res){
        try{

            const memorias = await Memoria.findById(req.params.id).populate('lojas.idLoja').exec()

            return res.json(memorias)

        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
            
        }        
    },

    async store(req, res){
        try{

            const jsonProdutos = JSON.parse(req.body.jsonProdutos)
            const idLoja = req.headers.idloja

            let memorias = []
            
            for(let i = 0; i < jsonProdutos.length;i++){
                    
                if(jsonProdutos[i]){
                    
                    var verificaModelo = await Memoria.countDocuments({ modelo: `${jsonProdutos[i].modelo}` })
                    var verificaIdLoja = await Memoria.countDocuments({
                        $and: [
                            { modelo: `${jsonProdutos[i].modelo}`},
                            { lojas: { $elemMatch: { idLoja: { $eq: `${idLoja}`} } } }
                        ]
                    })

                    if(verificaModelo == 0){
                        
                        memorias.push(
                            await Memoria.create({
                                imagem: jsonProdutos[i].imagem,
                                nome: jsonProdutos[i].nome,
                                modelo:jsonProdutos[i].modelo,    
                                fabricante: jsonProdutos[i].fabricante,
                                velocidade: jsonProdutos[i].velocidade,
                                tipo: jsonProdutos[i].tipo,
                                capacidade: jsonProdutos[i].capacidade,
                                modulo: jsonProdutos[i].modulo,
                                cor: jsonProdutos[i].cor,
                                voltagem: jsonProdutos[i].voltagem,
                                cas_latency: jsonProdutos[i].cas_latency,
                                suporte_ecc: jsonProdutos[i].suporte_ecc,
                                registrada: jsonProdutos[i].registrada,
                                dissipador: jsonProdutos[i].dissipador,
                                lojas: [{
                                    idLoja,
                                    preco: jsonProdutos[i].preco,
                                    urlProduto: jsonProdutos[i].urlProduto
                                }]                            
                            })
                        )
                        console.log('cadastrou')
                        
                    }else if(verificaModelo == 1 && verificaIdLoja == 0){

                        memorias.push(
                            await Memoria.findOneAndUpdate(
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
                        memorias.push('produto ja cadastrado pela loja')
                    }else{
                        memorias.push('algo está errado no banco de dados')
                    }

                }

            }

            return res.json(memorias)

        }catch(err){
            
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    },

    async update(req, res){
        try{

            const { preco, urlProduto } = req.body
            const idLoja = req.headers.idloja
            const { id } = req.params

            await Memoria.updateOne(
                { $and: [
                    { _id: id },
                    { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                ]},
                { $set: {
                    'lojas.$.preco': preco,
                    'lojas.$.urlProduto': urlProduto
                }},
                { omitUndefined: true }
            )

            const memorias = await Memoria.findOneAndUpdate(
                { $and: [
                    { _id: id },
                    { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                ]},
                { $push: { lojas: { $each: [], $sort: { preco: 1 } } } },
                { new: true }
            )
                    
            res.send(memorias)
            
        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    },

    async destroy(req, res){
        try{

            const idLoja = req.headers.idloja
            const { id } = req.params

            const numArrayLojas = await Memoria.countDocuments( { $and: [ { _id: id }, { 'lojas.1': {$exists: true} } ] } )

            if (numArrayLojas == 0){

                var memorias = await Memoria.deleteOne(
                    { $and: [
                        { _id: id },
                        { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                    ]}
                )

            }else if (numArrayLojas == 1){
                
                var memorias = await Memoria.findOneAndUpdate(
                    { _id: id },
                    { $pull: { lojas: { idLoja: idLoja } } },
                    { new: true, omitUndefined: true }
                )

            }else{

                var memorias = 'algo está errado no banco de dados'

            }

            res.send(memorias)

        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    }
}