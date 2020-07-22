import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import { IFonte } from './interfaces/produtoInterface'

const FonteSchema = new Schema<IFonte>({
  imagem: { type: String, select: true },
  nome: { type: String, select: true },
  modelo: { type: String, select: true },
  fabricante: { type: String, select: true },
  serie: { type: String, select: true },
  tipo: { type: String, select: true },
  modular: { type: String, select: true },
  certificado: { type: String, select: true },
  saida: { type: String, select: true },
  potencia: { type: Number, select: true },
  eficiencia: { type: Number, select: true },
  peso: { type: Number, select: true },
  conectores_pcie_6_pinos: { type: Number, select: true },
  conectores_pcie_6_2_pinos: { type: Number, select: true },
  fanless: { type: Boolean, select: true },
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

FonteSchema.plugin(mongoosePaginate)

FonteSchema.virtual('imagem_url').get(function (this: any) {
  return `http://192.168.1.100:3333/arquivos/fontes/${this.imagem}`
})

FonteSchema.pre('remove', function (this: Document | any) {
  return promisify(fs.unlink)(
    path.resolve(__dirname, '..', '..', 'uploads', 'fontes', this.imagem)
  )
})

const FonteModel = model<IFonte>('Fonte', FonteSchema)

export default FonteModel
