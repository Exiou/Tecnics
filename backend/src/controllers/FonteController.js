const Fonte = require('../models/Fonte')
const Loja = require('../models/Loja')

const { queryFonte } = require('./utils/queries')

module.exports = {
    async index(req, res){
        try{

            const fabricanteFiltro = await (await Fonte.find().distinct('fabricante')).toString(),
                tipoFiltro = await (await Fonte.find().distinct('tipo')).toString(),
                certificadoFiltro = await (await Fonte.find().distinct('certificado')).toString()

            const {
                page = 1,
                limit = 10,
                precoMin = 0,
                precoMax = 50000,
                potenciaMin = 0,
                potenciaMax = 1000,
                fanless = 'true,false',
                modular = 'true,false,full',
                fabricante = fabricanteFiltro,
                tipo = tipoFiltro,
                certificado = certificadoFiltro,
                ordenar = '',
                buscar = '',
            } = req.query

            const query = queryFonte(precoMin,precoMax,potenciaMin,potenciaMax,fanless,modular,fabricante,tipo,certificado,buscar)

            const options = {
                page,
                limit,
                select: '-serie -eficiencia -saida -conectores_pcie_6_pinos -conectores_pcie_6_2_pinos -lojas.idLoja -lojas.urlProduto -lojas._id',
                sort: `${ordenar}`
            }

            const fontes = await Fonte.paginate(query, options)

            return res.json({ fontes, filtros: { fabricanteFiltro, tipoFiltro, certificadoFiltro } })

        }catch(err){
            
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
        }

    },

    async show(req, res){
        try{

            const fontes = await Fonte.findById(req.params.id).populate('lojas.idLoja').exec()

            return res.json(fontes)

        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
            
        }        
    },

    async store(req, res){
        try{

            const jsonProdutos = JSON.parse(req.body.jsonProdutos)
            const idLoja = req.headers.idloja

            let fontes = []
            
            for(let i = 0; i < jsonProdutos.length;i++){
                    
                if(jsonProdutos[i]){
                    
                    var verificaModelo = await Fonte.countDocuments({ modelo: `${jsonProdutos[i].modelo}` })
                    var verificaIdLoja = await Fonte.countDocuments({
                        $and: [
                            { modelo: `${jsonProdutos[i].modelo}`},
                            { lojas: { $elemMatch: { idLoja: { $eq: `${idLoja}`} } } }
                        ]
                    })

                    if(verificaModelo == 0){
                        
                        fontes.push(
                            await Fonte.create({
                                imagem: jsonProdutos[i].imagem,
                                nome: jsonProdutos[i].nome,
                                modelo:jsonProdutos[i].modelo,    
                                fabricante: jsonProdutos[i].fabricante,
                                serie: jsonProdutos[i].serie,
                                tipo: jsonProdutos[i].tipo,
                                modular: jsonProdutos[i].modular,
                                certificado: jsonProdutos[i].certificado,
                                saida: jsonProdutos[i].saida,
                                potencia: jsonProdutos[i].potencia,
                                eficiencia: jsonProdutos[i].eficiencia,
                                peso: jsonProdutos[i].peso,
                                conectores_pcie_6_pinos: jsonProdutos[i].conectores_pcie_6_pinos,
                                conectores_pcie_6_2_pinos: jsonProdutos[i].conectores_pcie_6_2_pinos,
                                fanless: jsonProdutos[i].fanless,
                                lojas: [{
                                    idLoja,
                                    preco: jsonProdutos[i].preco,
                                    urlProduto: jsonProdutos[i].urlProduto
                                }]                            
                            })
                        )
                        console.log('cadastrou')
                        
                    }else if(verificaModelo == 1 && verificaIdLoja == 0){

                        fontes.push(
                            await Fonte.findOneAndUpdate(
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
                        fontes.push('produto ja cadastrado pela loja')
                    }else{
                        fontes.push('algo está errado no banco de dados')
                    }

                }

            }

            return res.json(fontes)

        }catch(err){
            
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    },

    async update(req, res){
        try{

            const { preco, urlProduto } = req.body
            const idLoja = req.headers.idloja
            const { id } = req.params

            await Fonte.updateOne(
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

            const fontes = await Fonte.findOneAndUpdate(
                { $and: [
                    { _id: id },
                    { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                ]},
                { $push: { lojas: { $each: [], $sort: { preco: 1 } } } },
                { new: true }
            )
                    
            res.send(fontes)
            
        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    },

    async destroy(req, res){
        try{

            const idLoja = req.headers.idloja
            const { id } = req.params

            const numArrayLojas = await Fonte.countDocuments( { $and: [ { _id: id }, { 'lojas.1': {$exists: true} } ] } )

            if (numArrayLojas == 0){

                var fontes = await Fonte.deleteOne(
                    { $and: [
                        { _id: id },
                        { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                    ]}
                )

            }else if (numArrayLojas == 1){
                
                var fontes = await Fonte.findOneAndUpdate(
                    { _id: id },
                    { $pull: { lojas: { idLoja: idLoja } } },
                    { new: true, omitUndefined: true }
                )

            }else{

                var fontes = 'algo está errado no banco de dados'

            }

            res.send(fontes)

        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    }
}