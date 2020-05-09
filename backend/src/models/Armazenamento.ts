import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import { IArmazenamento } from './interfaces/produtoInterface'

const ArmazenamentoSchema = new Schema<IArmazenamento>({
    imagem: String,
    nome: String,
    modelo: String,
    fabricante: String,
    serie: String,
    tipo: String,
    interface: String,
    formato: String,
    buffer_cache: String,
    rpm: Number,
    capacidade: Number,
    intellipower: Boolean,
    hibrido: Boolean,
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

ArmazenamentoSchema.plugin(mongoosePaginate)

ArmazenamentoSchema.virtual('imagem_url').get(function(this: any)  {
    return `http://192.168.1.100:3333/arquivos/armazenamentos/${this.imagem}`
})

ArmazenamentoSchema.pre('remove', function(this: Document | any) {
return promisify(fs.unlink)(
    path.resolve(__dirname,'..','..','uploads','armazenamentos',this.imagem)
)
})

const ArmazenamentoModel = model<IArmazenamento>('Armazenamento', ArmazenamentoSchema)

export default ArmazenamentoModel