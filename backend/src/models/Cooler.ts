import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import { ICooler } from './interfaces/produtoInterface'

const CoolerSchema = new Schema<ICooler>({
    imagem: { type: String, select: true},
    nome: { type: String, select: true},
    modelo: { type: String, select: true},
    fabricante: { type: String, select: true},
    rolamento: { type: String, select: true},
    socket: [{ type: String, select: true}],
    radiador: { type: String, select: true},
    cor: { type: String, select: true},
    led_rgb: { type: String, select: true},
    altura: { type: Number, select: true},
    rpm_ventoinha: { type: Number, select: true},
    peso: { type: Number, select: true},
    fanless: { type: Boolean, select: true},
    water_cooled: { type: Boolean, select: true},
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