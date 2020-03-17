const Armazenamento = require('../models/Armazenamento')
const Loja = require('../models/Loja')

const { queryArmazenamento } = require('./utils/queries')

module.exports = {
    async index(req, res){
        try{

            const fabricanteFiltro = await (await Armazenamento.find().distinct('fabricante')).toString(),
            tipoFiltro = await (await Armazenamento.find().distinct('tipo')).toString(),
            interfaceFiltro = await (await Armazenamento.find().distinct('interface')).toString(),
            formatoFiltro = await (await Armazenamento.find().distinct('formato')).toString(),
            buffer_cacheFiltro = await (await Armazenamento.find().distinct('buffer_cache')).toString()

            const {
                page = 1,
                limit = 10,
                precoMin = 0,
                precoMax = 50000,
                capacidadeMin = 0,
                capacidadeMax = 1000,
                intellipower = 'true,false',
                hibrido = 'true,false',
                fabricante = fabricanteFiltro,
                tipo = tipoFiltro,
                interface = interfaceFiltro,
                formato = formatoFiltro,
                buffer_cache = buffer_cacheFiltro,
                ordenar = '',
                buscar = '',
            } = req.query

            const query = queryArmazenamento(precoMin,precoMax,capacidadeMin,capacidadeMax,intellipower,hibrido,fabricante,tipo,interface,formato,buffer_cache,buscar)

            const options = {
                page,
                limit,
                select: '-serie -rpm -lojas.idLoja -lojas.urlProduto -lojas._id',
                sort: `${ordenar}`
            }

            const armazenamentos = await Armazenamento.paginate(query, options)

            return res.json({ armazenamentos, filtros: { fabricanteFiltro, tipoFiltro, interfaceFiltro, formatoFiltro, buffer_cacheFiltro } })

        }catch(err){
            
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
        }

    },

    async show(req, res){
        try{

            const armazenamentos = await Armazenamento.findById(req.params.id).populate('lojas.idLoja').exec()

            return res.json(armazenamentos)

        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
            
        }        
    },

    async store(req, res){
        try{

            const jsonProdutos = JSON.parse(req.body.jsonProdutos)
            const idLoja = req.headers.idloja

            let armazenamentos = []
            
            for(let i = 0; i < jsonProdutos.length;i++){
                    
                if(jsonProdutos[i]){
                    
                    var verificaModelo = await Armazenamento.countDocuments({ modelo: `${jsonProdutos[i].modelo}` })
                    var verificaIdLoja = await Armazenamento.countDocuments({
                        $and: [
                            { modelo: `${jsonProdutos[i].modelo}`},
                            { lojas: { $elemMatch: { idLoja: { $eq: `${idLoja}`} } } }
                        ]
                    })

                    if(verificaModelo == 0){
                        
                        armazenamentos.push(
                            await Armazenamento.create({
                                imagem: jsonProdutos[i].imagem,
                                nome: jsonProdutos[i].nome,
                                modelo:jsonProdutos[i].modelo,    
                                fabricante: jsonProdutos[i].fabricante,
                                serie: jsonProdutos[i].serie,
                                tipo: jsonProdutos[i].tipo,
                                interface: jsonProdutos[i].interface,
                                formato: jsonProdutos[i].formato,
                                buffer_cache: jsonProdutos[i].buffer_cache,
                                rpm: jsonProdutos[i].rpm,
                                capacidade: jsonProdutos[i].capacidade,
                                intellipower: jsonProdutos[i].intellipower,
                                hibrido: jsonProdutos[i].hibrido,
                                lojas: [{
                                    idLoja,
                                    preco: jsonProdutos[i].preco,
                                    urlProduto: jsonProdutos[i].urlProduto
                                }]                            
                            })
                        )
                        console.log('cadastrou')
                        
                    }else if(verificaModelo == 1 && verificaIdLoja == 0){

                        armazenamentos.push(
                            await Armazenamento.findOneAndUpdate(
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
                        armazenamentos.push('produto ja cadastrado pela loja')
                    }else{
                        armazenamentos.push('algo está errado no banco de dados')
                    }

                }

            }

            return res.json(armazenamentos)

        }catch(err){
            
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    },

    async update(req, res){
        try{

            const { preco, urlProduto } = req.body
            const idLoja = req.headers.idloja
            const { id } = req.params



            await Armazenamento.updateOne(
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

            const armazenamentos = await Armazenamento.findOneAndUpdate(
                { $and: [
                    { _id: id },
                    { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                ]},
                { $push: { lojas: { $each: [], $sort: { preco: 1 } } } },
                { new: true }
            )
                    
            res.send(armazenamentos)
            
        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    },

    async destroy(req, res){
        try{

            const idLoja = req.headers.idloja
            const { id } = req.params

            const numArrayLojas = await Armazenamento.countDocuments( { $and: [ { _id: id }, { 'lojas.1': {$exists: true} } ] } )

            if (numArrayLojas == 0){

                var armazenamentos = await Armazenamento.deleteOne(
                    { $and: [
                        { _id: id },
                        { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                    ]}
                )

            }else if (numArrayLojas == 1){
                
                var armazenamentos = await Armazenamento.findOneAndUpdate(
                    { _id: id },
                    { $pull: { lojas: { idLoja: idLoja } } },
                    { new: true, omitUndefined: true }
                )

            }else{

                var armazenamentos = 'algo está errado no banco de dados'

            }

            res.send(armazenamentos)

        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    }
}