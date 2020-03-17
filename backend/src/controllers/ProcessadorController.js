//importar dependências
const Processador = require('../models/Processador')
const Loja = require('../models/Loja')

//importar query (filtro)
const { queryProcessador } = require('./utils/queries')

module.exports = {
    async index(req, res){
        try{
            //buscar valores distintos e únicos de cada filtro no banco de dados
            const fabricanteFiltro = await (await Processador.find().distinct('fabricante')).toString(),
                serieFiltro = await (await Processador.find().distinct('serie')).toString(),
                familiaFiltro = await (await Processador.find().distinct('familia')).toString(),
                socketFiltro = await (await Processador.find().distinct('socket')).toString(),
                graficosFiltro = await (await Processador.find().distinct('graficos_integrados')).toString()
            
            //receber parâmetros através do req.query atribuindo valores padrão
            const {
                page= 1,
                limit = 10,
                precoMin = 0,
                precoMax = 50000,
                nucleoMin = 0,
                nucleoMax = 128,
                freqMin = 0,
                freqMax = 10,
                consumoMin = 0,
                consumoMax = 10000,
                cooler = 'true,false',
                multithreading = 'true,false',
                ecc = 'true,false',
                virtualizacao = 'true,false',
                fabricante = fabricanteFiltro,
                serie = serieFiltro,
                familia = familiaFiltro,
                socket = socketFiltro,
                graficos = graficosFiltro,
                ordenar = '',
                buscar = ''
            } = req.query

            //pegar os dados de outro arquivo para armazenar na variável query
            const query = queryProcessador(buscar,precoMin,precoMax,nucleoMin,nucleoMax,freqMin,freqMax,consumoMin,consumoMax,cooler,multithreading,ecc,virtualizacao,fabricante,serie,familia,socket,graficos)

            //opções de busca (página, limite de documentos, quais campos retornar, ordenar por certo campo)
            const options = {
                page,
                limit,
                select: '-arquitetura -thread -litografia -lojas.idLoja -lojas.urlProduto -lojas._id',
                sort: `${ordenar}`
            }

            //buscar todos os processadores no banco de dados passando os filtros e as opções
            const processadores = await Processador.paginate(query, options)

            //retornar resposta em formato json com o resultado da busca no banco de dados e os filtros de busca
            return res.json({ processadores, filtros: { fabricanteFiltro, serieFiltro, familiaFiltro, socketFiltro, graficosFiltro } })

        }catch(err){
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
        }



    },

    async show(req, res){
        try{

            //buscar o produto por id e "populacionar" as informações das lojas que cadastraram esse produto
            const processadores = await Processador.findById(req.params.id).populate('lojas.idLoja').exec()

            //retornar resposta em formato json com o resultado da busca
            return res.json(processadores)

        }catch(err){
            
            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)
            
        }
    },

    async store(req, res){
        try{
            
            const jsonProdutos = JSON.parse(req.body.jsonProdutos) //receber os produtos por req.body
            const idLoja = req.headers.idloja //receber o id da loja por req.headers

            let processadores = []
            
            for(let i = 0; i < jsonProdutos.length;i++){
                    
                if(jsonProdutos[i]){
                    
                    //verifica se o modelo existe no banco de dados
                    var verificaModelo = await Processador.countDocuments({ modelo: `${jsonProdutos[i].modelo}` })
                    //verifica se a loja possui esse mesmo modelo cadastrado
                    var verificaIdLoja = await Processador.countDocuments({
                        $and: [
                            { modelo: `${jsonProdutos[i].modelo}`},
                            { lojas: { $elemMatch: { idLoja: { $eq: `${idLoja}`} } } }
                        ]
                    })
                    
                    //se não existir o modelo
                    if(verificaModelo == 0){
                        
                        processadores.push(
                            //cria um novo documento no banco de dados
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

                     //se existir o modelo mas a loja não o tiver cadastrado
                    }else if(verificaModelo == 1 && verificaIdLoja == 0){

                        processadores.push(
                            //encontra o modelo e adiciona ao array o id da loja, o preço do produto e o url do produto
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
                                            $sort: { preco: 1 } //ordenar array por preço
                                        }
                                    }
                                },
                                {new: true}
                            )
                        )
                     //se o modelo existe e a loja ja o cadastrou
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

            const { preco, urlProduto } = req.body //pegar dados por req.body
            const idLoja = req.headers.idloja //pegar id da loja por req.headers
            const { id } = req.params //pegar id do produto por req.params

            //acha o produto e atualiza seu preço e, opcionalmente, seu url
            await Processador.updateOne(
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

            //acha o produto e ordena o array das lojas de acordo com o preço em valor crescente
            const processadores = await Processador.findOneAndUpdate(
                { $and: [
                    { _id: id },
                    { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                ]},
                { $push: { lojas: { $each: [], $sort: { preco: 1 } } } },
                { new: true }
            )
                    
            res.send(processadores)
            
        }catch(err){

            return res.status(400).send(`Ocorreu um erro na requisição: ${err}`)

        }
    },

    async destroy(req, res){
        try{

            const idLoja = req.headers.idloja //pega o id da loja
            const { id } = req.params //pega o id do produto

            //verifica se mais de 1 loja cadastrou o produto
            const numArrayLojas = await Processador.countDocuments( { $and: [ { _id: id }, { 'lojas.1': {$exists: true} } ] } )

            //se apenas uma cadastrou
            if (numArrayLojas == 0){

                //acha o produto e deleta todos os registros
                var processadores = await Processador.deleteOne(
                    { $and: [
                        { _id: id },
                        { lojas: { $elemMatch: { idLoja: { $eq: idLoja }}}}
                    ]}
                )
            //se mais de uma cadastrou
            }else if (numArrayLojas == 1){
                
                //acha o produto e remove apenas a loja que está atualizando o registro
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