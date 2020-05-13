import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import { IMemoria } from './interfaces/produtoInterface'

const MemoriaSchema = new Schema<IMemoria>({
    imagem: { type: String, select: true},
    nome: { type: String, select: true},
    modelo: { type: String, select: true},
    fabricante: { type: String, select: true},
    velocidade: { type: String, select: true},
    tipo: { type: String, select: true},
    capacidade: { type: String, select: true},
    modulo: { type: String, select: true},
    cor: { type: String, select: true},
    voltagem: { type: Number, select: true},
    cas_latency: { type: Number, select: true},
    suporte_ecc: { type: Boolean, select: true},
    registrada: { type: Boolean, select: true},
    dissipador: { type: Boolean, select: true},
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