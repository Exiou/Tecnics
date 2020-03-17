const Gabinete = require('../models/Gabinete')
const Loja = require('../models/Loja')

const { queryGabinete } = require('./utils/queries')

module.exports = {
    async index(req, res){
        try{

            const fabricanteFiltro = await (await Gabinete.find().distinct('fabricante')).toString(),
                tipoFiltro = await (await Gabinete.find().distinct('tipo')).toString(),
                corFiltro = await (await Gabinete.find().distinct('cor')).toString()

            const {
                page = 1,
                limit = 10,
                precoMin = 0,
                precoMax = 50000,
                baia_externa_525Min = 0,
                baia_externa_525Max = 20,
                baia_externa_350Min = 0,
                baia_externa_350Max = 20,
                baia_interna_350Min = 0,
                baia_interna_350Max = 20,
                baia_interna_250Min = 0,
                baia_interna_250Max = 20,
                fonte = 'true,false',
                janela_lateral = 'true,false',
                painel_frontal_usb3 = 'true,false',
                filtro_removivel = 'true,false',
                fabricante = fabricanteFiltro,
                tipo = tipoFiltro,
                cor = corFiltro,
                ordenar = '',
                buscar = '',
            } = req.query

            const query = queryGabinete(precoMin,precoMax,baia_externa_525Min,baia_externa_525Max,baia_externa_350Min,baia_externa_350Max,baia_interna_350Min,baia_interna_350Max,baia_interna_250Min,baia_interna_250Max,fonte,janela_lateral,painel_frontal_usb3,filtro_removivel,fabricante,tipo,cor,buscar)

            const options = {
                page,
                limit,
                select: '-slot_full_height -slot_half_height -potencia_fonte -peso -led_rgb -lojas.idLoja -lojas.urlProduto -lojas._id',
                sort: `${ordenar}`
            }

            const gabinetes = await Gabinete.paginate(query, options)

            return res.json({ gabinetes, filtros: { fabricanteFiltro, tipoFiltro, corFiltro } })

        }catch(err){
            
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
        }

    },

    async show(req, res){
        try{

            const gabinetes = await Gabinete.findById(req.params.id).populate('lojas.idLoja').exec()

            return res.json(gabinetes)

        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
            
        }        
    },

    async store(req, res){
        try{

            const jsonProdutos = JSON.parse(req.body.jsonProdutos)
            const idLoja = req.headers.idloja

            let gabinetes = []
            
            for(let i = 0; i < jsonProdutos.length;i++){
                    
                if(jsonProdutos[i]){
                    
                    var verificaModelo = await Gabinete.countDocuments({ modelo: `${jsonProdutos[i].modelo}` })
                    var verificaIdLoja = await Gabinete.countDocuments({
                        $and: [
                            { modelo: `${jsonProdutos[i].modelo}`},
                            { lojas: { $elemMatch: { idLoja: { $eq: `${idLoja}`} } } }
                        ]
                    })

                    if(verificaModelo == 0){
                        
                        gabinetes.push(
                            await Gabinete.create({
                                imagem: jsonProdutos[i].imagem,
                                nome: jsonProdutos[i].nome,
                                modelo:jsonProdutos[i].modelo,    
                                fabricante: jsonProdutos[i].fabricante,
                                tipo: jsonProdutos[i].tipo,
                                cor: jsonProdutos[i].cor,
                                led_rgb: jsonProdutos[i].led_rgb,
                                formato_placa_mae: jsonProdutos[i].formato_placa_mae,
                                baia_externa_525: jsonProdutos[i].baia_externa_525,
                                baia_externa_350: jsonProdutos[i].baia_externa_350,
                                baia_interna_350: jsonProdutos[i].baia_interna_350,
                                baia_interna_250: jsonProdutos[i].baia_interna_250,
                                slot_full_height: jsonProdutos[i].slot_full_height,
                                slot_half_height: jsonProdutos[i].slot_half_height,
                                potencia_fonte: jsonProdutos[i].potencia_fonte,
                                peso: jsonProdutos[i].peso,
                                fonte: jsonProdutos[i].fonte,
                                janela_lateral: jsonProdutos[i].janela_lateral,
                                painel_frontal_usb3: jsonProdutos[i].painel_frontal_usb3,
                                filtro_removivel: jsonProdutos[i].filtro_removivel,
                                lojas: [{
                                    idLoja,
                                    preco: jsonProdutos[i].preco,
                                    urlProduto: jsonProdutos[i].urlProduto
                                }]                            
                            })
                        )
                        console.log('cadastrou')
                        
                    }else if(verificaModelo == 1 && verificaIdLoja == 0){

                        gabinetes.push(
                            await Gabinete.findOneAndUpdate(
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
                        gabinetes.push('produto ja cadastrado pela loja')
                    }else{
                        gabinetes.push('algo está errado no banco de dados')
                    }

                }

            }

            return res.json(gabinetes)

        }catch(err){
            
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    },

    async update(req, res){
        try{

            const { preco, urlProduto } = req.body
            const idLoja = req.headers.idloja
            const { id } = req.params

            await Gabinete.updateOne(
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

            const gabinetes = await Gabinete.findOneAndUpdate(
                { $and: [
                    { _id: id },
                    { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                ]},
                { $push: { lojas: { $each: [], $sort: { preco: 1 } } } },
                { new: true }
            )
                    
            res.send(gabinetes)
            
        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    },

    async destroy(req, res){
        try{

            const idLoja = req.headers.idloja
            const { id } = req.params

            const numArrayLojas = await Gabinete.countDocuments( { $and: [ { _id: id }, { 'lojas.1': {$exists: true} } ] } )

            if (numArrayLojas == 0){

                var gabinetes = await Gabinete.deleteOne(
                    { $and: [
                        { _id: id },
                        { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                    ]}
                )

            }else if (numArrayLojas == 1){
                
                var gabinetes = await Gabinete.findOneAndUpdate(
                    { _id: id },
                    { $pull: { lojas: { idLoja: idLoja } } },
                    { new: true, omitUndefined: true }
                )

            }else{

                var gabinetes = 'algo está errado no banco de dados'

            }

            res.send(gabinetes)

        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    }
}