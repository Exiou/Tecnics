import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import { IPlacaVideo } from './interfaces/produtoInterface'

const PlacaVideoSchema = new Schema<IPlacaVideo>({
    imagem: String,
    nome: String,
    modelo: String,
    fabricante: String,
    serie: String,
    chipset: String,
    tipo_memoria: String,
    interface: String,
    sli_crossfire: String,
    cor: String,   
    led_rgb: String,
    tamanho_memoria: Number,
    core_clock: Number,
    boost_clock: Number,
    comprimento: Number,
    portas_dvi: Number,
    portas_hdmi: Number,
    portas_mini_hdmi: Number,
    portas_display_port: Number,
    portas_mini_display_port: Number,
    slots_ocupados: Number,
    consumo: Number,
    fanless: Boolean,
    water_cooled: Boolean,
    suporte_gsync: Boolean,
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