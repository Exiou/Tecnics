import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import { IProcessador } from './interfaces/produtoInterface'

const ProcessadorSchema = new Schema<IProcessador>({
    imagem: { type: String, select: true},
    nome: { type: String, select: true},
    modelo: { type: String, select: true},
    fabricante: { type: String, select: true},
    serie: { type: String, select: true},
    familia: { type: String, select: true},
    socket: { type: String, select: true},
    graficos_integrados: { type: String, select: true},
    nucleo: { type: Number, select: true},
    frequencia: { type: Number, select: true},
    frequencia_turbo:{ type: Number, select: true},
    consumo: { type: Number, select: true},
    arquitetura: { type: Number, select: true},
    thread: { type: Number, select: true},
    litografia: { type: Number, select: true},
    cooler_incluso: { type: Boolean, select: true},
    multithreading: { type: Boolean, select: true},
    suporte_ecc: { type: Boolean, select: true},
    virtualizacao: { type: Boolean, select: true},
    lojas:[
        {
            idLoja: {
                type: Schema.Types.ObjectId,
                ref: 'Loja'
            },
            preco: Number,
            urlProduto: String
        }
    ]
}, { toJSON: { virtuals: true }})

ProcessadorSchema.plugin(mongoosePaginate)

ProcessadorSchema.virtual('imagem_url').get(function(this: any)  {
    return `http://192.168.1.100:3333/arquivos/processadores/${this.imagem}`
})

ProcessadorSchema.pre('remove', function(this: Document | any) {
return promisify(fs.unlink)(
    path.resolve(__dirname,'..','..','uploads','processadores',this.imagem)
)
})

const ProcessadorModel = model<IProcessador>('Processador', ProcessadorSchema)

export default ProcessadorModel