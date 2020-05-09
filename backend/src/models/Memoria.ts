import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import { IMemoria } from './interfaces/produtoInterface'

const MemoriaSchema = new Schema<IMemoria>({
    imagem: String,
    nome: String,
    modelo: String,
    fabricante: String,
    velocidade: String,
    tipo: String,
    capacidade: String,
    modulo: String,
    cor: String,
    voltagem: Number,
    cas_latency: Number,
    suporte_ecc: Boolean,
    registrada: Boolean,
    dissipador: Boolean,
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

MemoriaSchema.plugin(mongoosePaginate)

MemoriaSchema.virtual('imagem_url').get(function(this: any)  {
    return `http://192.168.1.100:3333/arquivos/memorias/${this.imagem}`
})

MemoriaSchema.pre('remove', function(this: Document | any) {
return promisify(fs.unlink)(
    path.resolve(__dirname,'..','..','uploads','memorias',this.imagem)
)
})

const MemoriaModel = model<IMemoria>('Memoria', MemoriaSchema)

export default MemoriaModel