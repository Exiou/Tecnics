import { Request, Response, Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/multer'

import Processador from '../models/Processador'
import IProcessador from '../models/interfaces/processadorInterface'

import getFilters from './utils/getFilters'
import { queryProcessador } from './utils/queries'

class ProcessadorController {
    public path = '/processadores'
    public routes = Router()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.routes.get(`${this.path}`, this.index)
        this.routes.get(`${this.path}/:userid`, this.show)
        this.routes.post(`${this.path}`, multer(uploadConfig('processadores')).array('files'), this.store)
        this.routes.put(`${this.path}/:userid`, multer(uploadConfig('processadores')).single('file'), this.update)
        this.routes.delete(`${this.path}/:userid`, this.destroy)
    }

    public async index (req: Request, res: Response): Promise<Response> {
        try {
            const filters = await getFilters(Processador, ['fabricante', 'serie', 'familia', 'socket', 'graficos_integrados'])

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
                fabricante = filters.fabricante,
                serie = filters.serie,
                familia = filters.familia,
                socket = filters.socket,
                graficos_integrados = filters.graficos_integrados,
                ordenar = '',
                buscar = ''
            } = req.query as any

            const query = queryProcessador(buscar,precoMin,precoMax,nucleoMin,nucleoMax,freqMin,freqMax,consumoMin,consumoMax,cooler,multithreading,ecc,virtualizacao,fabricante,serie,familia,socket,graficos_integrados)

            const options = {
                page,
                limit,
                select: '',
                sort: ordenar
            }
            
            const processadores = await Processador.paginate(query, options)

            return res.json({ processadores, filters })
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }

    public async show (req: Request, res: Response): Promise<Response> {
        try {

            const { userid } = req.params

            const processador =  await Processador.findOne({ _id: userid }).populate('lojas.idLoja')
            
            return res.json(processador)
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }

    public async store (req: Request, res: Response): Promise<Response> {
        try {

            const jsonProdutos: IProcessador[] = JSON.parse(req.body.jsonProdutos)
            const idLoja = req.headers.idloja?.toString()!

            let processadores = []

            for await (let produto of jsonProdutos){
                if(produto.lojas){
                    let verificaModelo = await Processador.countDocuments({ modelo: produto.modelo })
                    let verificaIdLoja = await Processador.countDocuments({
                        $and: [
                            { modelo: `${produto.modelo}`},
                            { lojas: { $elemMatch: { idLoja: { $eq: `${idLoja}`} } } }
                        ]
                    })
                    
                    produto.lojas[0].idLoja = idLoja

                    if(verificaModelo == 0) processadores.push(await Processador.create(produto))

                    else if(verificaModelo == 1 && verificaIdLoja == 0) {
                        processadores.push(
                            await Processador.findOneAndUpdate(
                                {
                                    $and: [
                                        { modelo: produto.modelo },
                                        { lojas: { $elemMatch: { idLoja: { $ne: idLoja} } } }
                                    ]
                                },
                                {
                                    $push: {
                                        lojas: {
                                            $each: [{
                                                idLoja,
                                                preco: produto.lojas[0].preco,
                                                urlProduto: produto.lojas[0].urlProduto
                                            }],
                                            $sort: { preco: 1 }
                                        }
                                    }
                                },
                                { new: true }
                            )
                        )
                    }

                    else if(verificaModelo == 1 && verificaIdLoja == 1) processadores.push('produto já cadastrado pela loja')

                    else{
                        processadores.push('algo está errado no banco de dados')
                    }
                }
            }

            return res.json(processadores)
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }

    public async update (req: Request, res: Response): Promise<Response> {
        try {
            
            return res.json('')
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }

    public async destroy (req: Request, res: Response): Promise<Response> {
        try {
            
            return res.json('')
        } catch (err) {
            return res.send(`Ocorreu um erro na requisição: ${err}`)
        }
    }
}

export default ProcessadorController