import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import { IGabinete } from './interfaces/produtoInterface'

const GabineteSchema = new Schema<IGabinete>({
    imagem: String,
    nome: String,
    modelo: String,
    fabricante: String,
    tipo: String,
    cor: String,
    led_rgb: String,
    formato_placa_mae: String,
    baia_externa_525: Number,
    baia_externa_350: Number,
    baia_interna_350: Number,
    baia_interna_250: Number,
    slot_full_height: Number,
    slot_half_height: Number,
    potencia_fonte: Number,
    peso: Number,
    fonte: Boolean,
    janela_lateral: Boolean,
    painel_frontal_usb3: Boolean,
    filtro_removivel: Boolean,
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

GabineteSchema.plugin(mongoosePaginate)

GabineteSchema.virtual('imagem_url').get(function(this: any)  {
    return `http://192.168.1.100:3333/arquivos/gabinetes/${this.imagem}`
})

GabineteSchema.pre('remove', function(this: Document | any) {
return promisify(fs.unlink)(
    path.resolve(__dirname,'..','..','uploads','gabinetes',this.imagem)
)
})

const GabineteModel = model<IGabinete>('Gabinete', GabineteSchema)

export default GabineteModel