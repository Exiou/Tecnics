import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import { IGabinete } from './interfaces/produtoInterface'

const GabineteSchema = new Schema<IGabinete>({
  imagem: { type: String, select: true },
  nome: { type: String, select: true },
  modelo: { type: String, select: true },
  fabricante: { type: String, select: true },
  tipo: { type: String, select: true },
  cor: { type: String, select: true },
  led_rgb: { type: String, select: true },
  formato_placa_mae: { type: String, select: true },
  baia_externa_525: { type: Number, select: true },
  baia_externa_350: { type: Number, select: true },
  baia_interna_350: { type: Number, select: true },
  baia_interna_250: { type: Number, select: true },
  slot_full_height: { type: Number, select: true },
  slot_half_height: { type: Number, select: true },
  potencia_fonte: { type: Number, select: true },
  peso: { type: Number, select: true },
  fonte: { type: Boolean, select: true },
  janela_lateral: { type: Boolean, select: true },
  painel_frontal_usb3: { type: Boolean, select: true },
  filtro_removivel: { type: Boolean, select: true },
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

GabineteSchema.plugin(mongoosePaginate)

GabineteSchema.virtual('imagem_url').get(function (this: any) {
  return `http://192.168.1.100:3333/arquivos/gabinetes/${this.imagem}`
})

GabineteSchema.pre('remove', function (this: Document | any) {
  return promisify(fs.unlink)(
    path.resolve(__dirname, '..', '..', 'uploads', 'gabinetes', this.imagem)
  )
})

const GabineteModel = model<IGabinete>('Gabinete', GabineteSchema)

export default GabineteModel
