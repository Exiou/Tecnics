import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import { IPlacaVideo } from './interfaces/produtoInterface'

const PlacaVideoSchema = new Schema<IPlacaVideo>({
    imagem: { type: String, select: true},
    nome: { type: String, select: true},
    modelo: { type: String, select: true},
    fabricante: { type: String, select: true},
    serie: { type: String, select: true},
    chipset: { type: String, select: true},
    tipo_memoria: { type: String, select: true},
    interface: { type: String, select: true},
    sli_crossfire: { type: String, select: true},
    cor: { type: String, select: true},   
    led_rgb: { type: String, select: true},
    tamanho_memoria: { type: Number, select: true},
    core_clock: { type: Number, select: true},
    boost_clock: { type: Number, select: true},
    comprimento: { type: Number, select: true},
    portas_dvi: { type: Number, select: true},
    portas_hdmi: { type: Number, select: true},
    portas_mini_hdmi: { type: Number, select: true},
    portas_display_port: { type: Number, select: true},
    portas_mini_display_port: { type: Number, select: true},
    slots_ocupados: { type: Number, select: true},
    consumo: { type: Number, select: true},
    fanless: { type: Boolean, select: true},
    water_cooled: { type: Boolean, select: true},
    suporte_gsync: { type: Boolean, select: true},
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

PlacaVideoSchema.plugin(mongoosePaginate)

PlacaVideoSchema.virtual('imagem_url').get(function(this: any)  {
    return `http://192.168.1.100:3333/arquivos/placa-videos/${this.imagem}`
})

PlacaVideoSchema.pre('remove', function(this: Document | any) {
return promisify(fs.unlink)(
    path.resolve(__dirname,'..','..','uploads','placa-videos',this.imagem)
)
})

const PlacaVideoModel = model<IPlacaVideo>('PlacaVideo', PlacaVideoSchema)

export default PlacaVideoModel