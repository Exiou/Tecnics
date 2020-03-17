const Cooler = require('../models/Cooler')
const Loja = require('../models/Loja')

const { queryCooler } = require('./utils/queries')

module.exports = {
    async index(req, res){
        try{

            const fabricanteFiltro = await (await Cooler.find().distinct('fabricante')).toString(),
                rolamentoFiltro = await (await Cooler.find().distinct('rolamento')).toString(),
                socketFiltro = await (await Cooler.find().distinct('socket')).toString(),
                radiadorFiltro = await (await Cooler.find().distinct('radiador')).toString(),
                corFiltro = await (await Cooler.find().distinct('cor')).toString()

            const {
                page = 1,
                limit = 10,
                precoMin = 0,
                precoMax = 50000,
                alturaMin = 0,
                alturaMax = 1000,
                fanless = 'true,false',
                fabricante = fabricanteFiltro,
                rolamento = rolamentoFiltro,
                socket = socketFiltro,
                radiador = radiadorFiltro,
                cor = corFiltro,
                ordenar = '',
                buscar = '',
            } = req.query

            const query = queryCooler(precoMin,precoMax,alturaMin,alturaMax,fanless,fabricante,rolamento,socket,radiador,cor,buscar)

            const options = {
                page,
                limit,
                select: '-led_rgb -rpm_ventoinha -peso -water_cooled -lojas.idLoja -lojas.urlProduto -lojas._id',
                sort: `${ordenar}`
            }

            const coolers = await Cooler.paginate(query, options)

            return res.json({ coolers, filtros: { fabricanteFiltro, rolamentoFiltro, socketFiltro, radiadorFiltro, corFiltro } })

        }catch(err){
            
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
        }

    },

    async show(req, res){
        try{

            const coolers = await Cooler.findById(req.params.id).populate('lojas.idLoja').exec()

            return res.json(coolers)

        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
            
        }        
    },

    async store(req, res){
        try{

            const jsonProdutos = JSON.parse(req.body.jsonProdutos)
            const idLoja = req.headers.idloja

            let coolers = []
            
            for(let i = 0; i < jsonProdutos.length;i++){
                    
                if(jsonProdutos[i]){
                    
                    var verificaModelo = await Cooler.countDocuments({ modelo: `${jsonProdutos[i].modelo}` })
                    var verificaIdLoja = await Cooler.countDocuments({
                        $and: [
                            { modelo: `${jsonProdutos[i].modelo}`},
                            { lojas: { $elemMatch: { idLoja: { $eq: `${idLoja}`} } } }
                        ]
                    })

                    if(verificaModelo == 0){
                        
                        coolers.push(
                            await Cooler.create({
                                imagem: jsonProdutos[i].imagem,
                                nome: jsonProdutos[i].nome,
                                modelo:jsonProdutos[i].modelo,    
                                fabricante: jsonProdutos[i].fabricante,
                                rolamento: jsonProdutos[i].rolamento,
                                socket: jsonProdutos[i].socket,
                                radiador: jsonProdutos[i].radiador,
                                cor: jsonProdutos[i].cor,
                                led_rgb: jsonProdutos[i].led_rgb,
                                altura: jsonProdutos[i].altura,
                                rpm_ventoinha: jsonProdutos[i].rpm_ventoinha,
                                peso: jsonProdutos[i].peso,
                                fanless: jsonProdutos[i].fanless,
                                water_cooled: jsonProdutos[i].water_cooled,
                                lojas: [{
                                    idLoja,
                                    preco: jsonProdutos[i].preco,
                                    urlProduto: jsonProdutos[i].urlProduto
                                }]                            
                            })
                        )
                        console.log('cadastrou')
                        
                    }else if(verificaModelo == 1 && verificaIdLoja == 0){

                        coolers.push(
                            await Cooler.findOneAndUpdate(
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
                        coolers.push('produto ja cadastrado pela loja')
                    }else{
                        coolers.push('algo está errado no banco de dados')
                    }

                }

            }

            return res.json(coolers)

        }catch(err){
            
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    },

    async update(req, res){
        try{

            const { preco, urlProduto } = req.body
            const idLoja = req.headers.idloja
            const { id } = req.params

            await Cooler.updateOne(
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

            const coolers = await Cooler.findOneAndUpdate(
                { $and: [
                    { _id: id },
                    { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                ]},
                { $push: { lojas: { $each: [], $sort: { preco: 1 } } } },
                { new: true }
            )
                    
            res.send(coolers)
            
        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    },

    async destroy(req, res){
        try{

            const idLoja = req.headers.idloja
            const { id } = req.params

            const numArrayLojas = await Cooler.countDocuments( { $and: [ { _id: id }, { 'lojas.1': {$exists: true} } ] } )

            if (numArrayLojas == 0){

                var coolers = await Cooler.deleteOne(
                    { $and: [
                        { _id: id },
                        { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                    ]}
                )

            }else if (numArrayLojas == 1){
                
                var coolers = await Cooler.findOneAndUpdate(
                    { _id: id },
                    { $pull: { lojas: { idLoja: idLoja } } },
                    { new: true, omitUndefined: true }
                )

            }else{

                var coolers = 'algo está errado no banco de dados'

            }

            res.send(coolers)

        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    }
}