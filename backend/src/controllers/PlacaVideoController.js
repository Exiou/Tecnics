const PlacaVideo = require('../models/PlacaVideo')
const Loja = require('../models/Loja')

const { queryPlacaVideo } = require('./utils/queries')

module.exports = {
    async index(req, res){
        try{

            const fabricanteFiltro = await (await PlacaVideo.find().distinct('fabricante')).toString(),
                serieFiltro = await (await PlacaVideo.find().distinct('serie')).toString(),
                chipsetFiltro = await (await PlacaVideo.find().distinct('chipset')).toString(),
                interfaceFiltro = await (await PlacaVideo.find().distinct('interface')).toString(),
                crossfireFiltro = await (await PlacaVideo.find().distinct('sli_crossfire')).toString(),
                corFiltro = await (await PlacaVideo.find().distinct('cor')).toString()

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
                fabricante = fabricanteFiltro,
                serie = serieFiltro,
                chipset = chipsetFiltro,
                interface = interfaceFiltro,
                crossfire = crossfireFiltro,
                cor = corFiltro,
                ordenar = '',
                buscar = '',
            } = req.query

            const query = queryPlacaVideo(precoMin,precoMax,memoriaMin,memoriaMax,clockMin,clockMax,comprimentoMin,comprimentoMax,dviMin,dviMax,hdmiMin,hdmiMax,mhdmiMin,mhdmiMax,displayMin,displayMax,mdisplayMin,mdisplayMax,slotMin,slotMax,consumoMin,consumoMax,fanless,watercooler,gsync,fabricante,serie,chipset,interface,crossfire,cor,buscar)

            const options = {
                page,
                limit,
                select: '-led_rgb -tipo_memoria -lojas.idLoja -lojas.urlProduto -lojas.-id',
                sort: `${ordenar}`
            }

            const placasMae = await PlacaVideo.paginate(query, options)

            return res.json({ placasMae, filtros: { fabricanteFiltro, serieFiltro, chipsetFiltro, interfaceFiltro, crossfireFiltro, corFiltro } })

        }catch(err){
            
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
        }

    },

    async show(req, res){
        try{

            const placasMae = await PlacaVideo.findById(req.params.id).populate('lojas.idLoja').exec()

            return res.json(placasMae)

        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
            
        }        
    },

    async store(req, res){
        try{

            const jsonProdutos = JSON.parse(req.body.jsonProdutos)
            const idLoja = req.headers.idloja

            let placasVideo = []
            
            for(let i = 0; i < jsonProdutos.length;i++){
                    
                if(jsonProdutos[i]){
                    
                    var verificaModelo = await PlacaVideo.countDocuments({ modelo: `${jsonProdutos[i].modelo}` })
                    var verificaIdLoja = await PlacaVideo.countDocuments({
                        $and: [
                            { modelo: `${jsonProdutos[i].modelo}`},
                            { lojas: { $elemMatch: { idLoja: { $eq: `${idLoja}`} } } }
                        ]
                    })

                    if(verificaModelo == 0){
                        
                        placasVideo.push(
                            await PlacaVideo.create({
                                imagem: jsonProdutos[i].imagem,
                                nome: jsonProdutos[i].nome,
                                modelo: jsonProdutos[i].modelo,
                                fabricante: jsonProdutos[i].fabricante,
                                serie: jsonProdutos[i].serie,
                                chipset: jsonProdutos[i].chipset,
                                tipo_memoria: jsonProdutos[i].tipo_memoria,
                                interface: jsonProdutos[i].interface,
                                sli_crossfire: jsonProdutos[i].sli_crossfire,
                                cor: jsonProdutos[i].cor,
                                tamanho_memoria: jsonProdutos[i].tamanho_memoria,
                                core_clock: jsonProdutos[i].core_clock,
                                boost_clock: jsonProdutos[i].boost_clock,
                                comprimento: jsonProdutos[i].comprimento,
                                portas_dvi: jsonProdutos[i].portas_dvi,
                                portas_hdmi: jsonProdutos[i].portas_hdmi,
                                portas_mini_hdmi: jsonProdutos[i].portas_mini_hdmi,
                                portas_display_port: jsonProdutos[i].portas_display_port,
                                portas_mini_display_port: jsonProdutos[i].portas_mini_display_port,
                                slots_ocupados: jsonProdutos[i].slots_ocupados,
                                consumo: jsonProdutos[i].consumo,
                                fanless: jsonProdutos[i].fanless,
                                water_cooled: jsonProdutos[i].water_cooled,
                                suporte_gsync: jsonProdutos[i].suporte_gsync,
                                led_rgb: jsonProdutos[i].led_rgb,
                                lojas: [{
                                    idLoja,
                                    preco: jsonProdutos[i].preco,
                                    urlProduto: jsonProdutos[i].urlProduto
                                }]                            
                            })
                        )
                        console.log('cadastrou')
                        
                    }else if(verificaModelo == 1 && verificaIdLoja == 0){

                        placasVideo.push(
                            await PlacaVideo.findOneAndUpdate(
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
                        placasVideo.push('produto ja cadastrado pela loja')
                    }else{
                        placasVideo.push('algo está errado no banco de dados')
                    }

                }

            }

            return res.json(placasVideo)

        }catch(err){
            
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    },

    async update(req, res){
        try{

            const { preco, urlProduto } = req.body
            const idLoja = req.headers.idloja
            const { id } = req.params

            await PlacaVideo.updateOne(
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

            const placasVideo = await PlacaVideo.findOneAndUpdate(
                { $and: [
                    { _id: id },
                    { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                ]},
                { $push: { lojas: { $each: [], $sort: { preco: 1 } } } },
                { new: true }
            )
                    
            res.send(placasVideo)
            
        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    },

    async destroy(req, res){
        try{

            const idLoja = req.headers.idloja
            const { id } = req.params

            const numArrayLojas = await PlacaVideo.countDocuments( { $and: [ { _id: id }, { 'lojas.1': {$exists: true} } ] } )

            if (numArrayLojas == 0){

                var placasVideo = await PlacaVideo.deleteOne(
                    { $and: [
                        { _id: id },
                        { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                    ]}
                )

            }else if (numArrayLojas == 1){
                
                var placasVideo = await PlacaVideo.findOneAndUpdate(
                    { _id: id },
                    { $pull: { lojas: { idLoja: idLoja } } },
                    { new: true, omitUndefined: true }
                )

            }else{

                var placasVideo = 'algo está errado no banco de dados'

            }

            res.send(placasVideo)

        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    }
}