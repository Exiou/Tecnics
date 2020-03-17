const PlacaMae = require('../models/PlacaMae')
const Loja = require('../models/Loja')

const { queryPlacaMae } = require('./utils/queries')

module.exports = {
    async index(req, res){
        try{

            const fabricanteFiltro = await (await PlacaMae.find().distinct('fabricante')).toString(),
                socketFiltro = await (await PlacaMae.find().distinct('socket')).toString(),
                formatoFiltro = await (await PlacaMae.find().distinct('formato')).toString(),
                chipsetFiltro = await (await PlacaMae.find().distinct('chipset')).toString(),
                crossfireFiltro = await (await PlacaMae.find().distinct('crossfire')).toString(),
                tipo_memoriaFiltro = await (await PlacaMae.find().distinct('tipo_memoria')).toString(),
                corFiltro = await (await PlacaMae.find().distinct('cor')).toString()

            const {
                page = 1,
                limit = 10,
                precoMin = 0,
                precoMax = 50000,
                portasSata3Min = 0,
                portasSata3Max = 50,
                portasSata6Min = 0,
                portasSata6Max = 100,
                portasSataExpMin = 0,
                portasSataExpMax = 10000,
                portasM2Min = 0,
                portasM2Max = 100,
                portasMSataMin = 0,
                portasMSataMax = 100,
                slotsRamMin = 0,
                slotsRamMax = 100,
                ramMaxMin = 0,
                ramMaxMax = 100,
                slotsPcieX16Min = 0,
                slotsPcieX16Max = 100,
                slotsPcieX4Min = 0,
                slotsPcieX4Max = 50,
                slotsPcieX1Min = 0,
                slotsPcieX1Max = 800,
                slotsPciMin = 0,
                slotsPciMax = 100,
                portasEthernetMin = 0,
                portasEthernetMax = 50,
                usb2Min = 0,
                usb2Max = 800,
                usb3Min = 0,
                usb3Max = 800,
                usb31Min = 0,
                usb31Max = 800,
                usbTypec = 'true,false',
                videoOnboard = 'true,false',
                suporteEcc = 'true,false',
                redeWireless = 'true,false',
                bluetooth = 'true,false',
                fabricante = fabricanteFiltro,
                socket = socketFiltro,
                formato = formatoFiltro,
                chipset = chipsetFiltro,
                crossfire = crossfireFiltro,
                tipo_memoria = tipo_memoriaFiltro,
                cor = corFiltro,
                ordenar = '',
                buscar = '',
            } = req.query

            const query = queryPlacaMae(precoMin,precoMax,portasSata3Min,portasSata3Max,portasSata6Min,portasSata6Max,portasSataExpMin,portasSataExpMax,portasM2Min,portasM2Max,portasMSataMin,portasMSataMax,slotsRamMin,slotsRamMax,ramMaxMin,ramMaxMax,slotsPcieX16Min,slotsPcieX16Max,slotsPcieX4Min,slotsPcieX4Max,slotsPcieX1Min,slotsPcieX1Max,slotsPciMin,slotsPciMax,portasEthernetMin,portasEthernetMax,usb2Min,usb2Max,usb3Min,usb3Max,usb31Min,usb31Max,usbTypec,videoOnboard,suporteEcc,redeWireless,bluetooth,fabricante,socket,formato,chipset,crossfire,tipo_memoria,cor,buscar)

            const options = {
                page,
                limit,
                select: '-tipo_memoria  -lojas.idLoja -lojas.urlProduto -lojas._id',
                sort: `${ordenar}`
            }

            const placasMae = await PlacaMae.paginate(query, options)

            return res.json({ placasMae, filtros: { fabricanteFiltro, socketFiltro, formatoFiltro, chipsetFiltro, crossfireFiltro, tipo_memoriaFiltro, corFiltro } })

        }catch(err){
            
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
        }

    },

    async show(req, res){
        try{

            const placasMae = await PlacaMae.findById(req.params.id).populate('lojas.idLoja').exec()

            return res.json(placasMae)

        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
            
        }        
    },

    async store(req, res){
        try{

            const jsonProdutos = JSON.parse(req.body.jsonProdutos)
            const idLoja = req.headers.idloja

            let placasMae = []
            
            for(let i = 0; i < jsonProdutos.length;i++){
                    
                if(jsonProdutos[i]){
                    
                    var verificaModelo = await PlacaMae.countDocuments({ modelo: `${jsonProdutos[i].modelo}` })
                    var verificaIdLoja = await PlacaMae.countDocuments({
                        $and: [
                            { modelo: `${jsonProdutos[i].modelo}`},
                            { lojas: { $elemMatch: { idLoja: { $eq: `${idLoja}`} } } }
                        ]
                    })

                    if(verificaModelo == 0){
                        
                        placasMae.push(
                            await PlacaMae.create({
                                imagem: jsonProdutos[i].imagem,
                                nome: jsonProdutos[i].nome,
                                modelo: jsonProdutos[i].modelo,
                                fabricante: jsonProdutos[i].fabricante,
                                socket: jsonProdutos[i].socket,
                                formato: jsonProdutos[i].formato,
                                chipset: jsonProdutos[i].chipset,
                                crossfire: jsonProdutos[i].crossfire,
                                tipo_memoria: jsonProdutos[i].tipo_memoria,
                                cor: jsonProdutos[i].cor,
                                portas_sata_3gb: jsonProdutos[i].portas_sata_3gb,
                                portas_sata_6gb: jsonProdutos[i].portas_sata_6gb,
                                portas_sata_express: jsonProdutos[i].portas_sata_express,
                                portas_m2: jsonProdutos[i].portas_m2,
                                portas_msata: jsonProdutos[i].portas_msata,
                                slots_ram: jsonProdutos[i].slots_ram,
                                ram_max: jsonProdutos[i].ram_max,
                                slots_pcie_x16: jsonProdutos[i].slots_pcie_x16,
                                slots_pcie_x4: jsonProdutos[i].slots_pcie_x4,
                                slots_pcie_x1: jsonProdutos[i].slots_pcie_x1,
                                slots_pci: jsonProdutos[i].slots_pci,
                                portas_ethernet: jsonProdutos[i].portas_ethernet,
                                usb_2: jsonProdutos[i].usb_2,
                                usb_3: jsonProdutos[i].usb_3,
                                usb_31: jsonProdutos[i].usb_31,
                                usb_typec: jsonProdutos[i].usb_typec,
                                video_onboard: jsonProdutos[i].video_onboard,
                                suporte_ecc: jsonProdutos[i].suporte_ecc,
                                rede_wireless: jsonProdutos[i].rede_wireless,
                                bluetooth: jsonProdutos[i].bluetooth,
                                lojas: [{
                                    idLoja,
                                    preco: jsonProdutos[i].preco,
                                    urlProduto: jsonProdutos[i].urlProduto
                                }]                            
                            })
                        )
                        console.log('cadastrou')
                        
                    }else if(verificaModelo == 1 && verificaIdLoja == 0){

                        placasMae.push(
                            await PlacaMae.findOneAndUpdate(
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
                        placasMae.push('produto ja cadastrado pela loja')
                    }else{
                        placasMae.push('algo está errado no banco de dados')
                    }

                }

            }

            return res.json(placasMae)

        }catch(err){
            
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    },

    async update(req, res){
        try{

            const { preco, urlProduto } = req.body
            const idLoja = req.headers.idloja
            const { id } = req.params

            await PlacaMae.updateOne(
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

            const placasMae = await PlacaMae.findOneAndUpdate(
                { $and: [
                    { _id: id },
                    { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                ]},
                { $push: { lojas: { $each: [], $sort: { preco: 1 } } } },
                { new: true }
            )
                    
            res.send(placasMae)
            
        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    },

    async destroy(req, res){
        try{

            const idLoja = req.headers.idloja
            const { id } = req.params

            const numArrayLojas = await PlacaMae.countDocuments( { $and: [ { _id: id }, { 'lojas.1': {$exists: true} } ] } )

            if (numArrayLojas == 0){

                var placasMae = await PlacaMae.deleteOne(
                    { $and: [
                        { _id: id },
                        { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                    ]}
                )

            }else if (numArrayLojas == 1){
                
                var placasMae = await PlacaMae.findOneAndUpdate(
                    { _id: id },
                    { $pull: { lojas: { idLoja: idLoja } } },
                    { new: true, omitUndefined: true }
                )

            }else{

                var placasMae = 'algo está errado no banco de dados'

            }

            res.send(placasMae)

        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    }
}