import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import { IProcessador } from './interfaces/produtoInterface'

const ProcessadorSchema = new Schema<IProcessador>({
    imagem: String,
    nome: String,
    modelo: String,
    fabricante: String,
    serie: String,
    familia: String,
    socket: String,
    graficos_integrados: String,
    nucleo: Number,
    frequencia: Number,
    frequencia_turbo:Number,
    consumo: Number,
    arquitetura: Number,
    thread: Number,
    litografia: Number,
    cooler_incluso: Boolean,
    multithreading: Boolean,
    suporte_ecc: Boolean,
    virtualizacao: Boolean,
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