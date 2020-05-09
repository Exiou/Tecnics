import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import { ICooler } from './interfaces/produtoInterface'

const CoolerSchema = new Schema<ICooler>({
    imagem: String,
    nome: String,
    modelo: String,
    fabricante: String,
    rolamento: String,
    socket: [String],
    radiador: String,
    cor: String,
    led_rgb: String,
    altura: Number,
    rpm_ventoinha: Number,
    peso: Number,
    fanless: Boolean,
    water_cooled: Boolean,
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

CoolerSchema.plugin(mongoosePaginate)

CoolerSchema.virtual('imagem_url').get(function(this: any)  {
    return `http://192.168.1.100:3333/arquivos/coolers/${this.imagem}`
})

CoolerSchema.pre('remove', function(this: Document | any) {
return promisify(fs.unlink)(
    path.resolve(__dirname,'..','..','uploads','coolers',this.imagem)
)
})

const CoolerModel = model<ICooler>('Cooler', CoolerSchema)

export default CoolerModel