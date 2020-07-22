import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import { IArmazenamento } from './interfaces/produtoInterface'

const ArmazenamentoSchema = new Schema<IArmazenamento>({
  imagem: { type: String, select: true },
  nome: { type: String, select: true },
  modelo: { type: String, select: true },
  fabricante: { type: String, select: true },
  serie: { type: String, select: true },
  tipo: { type: String, select: true },
  interface: { type: String, select: true },
  formato: { type: String, select: true },
  buffer_cache: { type: String, select: true },
  rpm: { type: Number, select: true },
  capacidade: { type: Number, select: true },
  intellipower: { type: Boolean, select: true },
  hibrido: { type: Boolean, select: true },
  lojas: [
    {
      idLoja: {
        type: Schema.Types.ObjectId,
        ref: 'Loja'
      },
      preco: Number,
      urlProduto: String
    }
  ]
}, { toJSON: { virtuals: true } })

ArmazenamentoSchema.plugin(mongoosePaginate)

ArmazenamentoSchema.virtual('imagem_url').get(function (this: any) {
  return `http://192.168.1.100:3333/arquivos/armazenamentos/${this.imagem}`
})

ArmazenamentoSchema.pre('remove', function (this: Document | any) {
  return promisify(fs.unlink)(
    path.resolve(__dirname, '..', '..', 'uploads', 'armazenamentos', this.imagem)
  )
})

const ArmazenamentoModel = model<IArmazenamento>('Armazenamento', ArmazenamentoSchema)

export default ArmazenamentoModel
