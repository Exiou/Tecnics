import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import { IPlacaMae } from './interfaces/produtoInterface'

const PlacaMaeSchema = new Schema<IPlacaMae>({
    imagem: { type: String, select: true},
    nome: { type: String, select: true},
    modelo: { type: String, select: true},
    fabricante: { type: String, select: true},
    socket: { type: String, select: true},
    formato: { type: String, select: true},
    chipset: { type: String, select: true},
    crossfire: { type: String, select: true},
    tipo_memoria: { type: String, select: true},
    cor: { type: String, select: true},
    portas_sata_3gb: { type: Number, select: true},
    portas_sata_6gb: { type: Number, select: true},
    portas_sata_express: { type: Number, select: true},
    portas_m2: { type: Number, select: true},
    portas_msata: { type: Number, select: true},
    slots_ram: { type: Number, select: true},
    ram_max: { type: Number, select: true},
    slots_pcie_x16: { type: Number, select: true},
    slots_pcie_x4: { type: Number, select: true},
    slots_pcie_x1: { type: Number, select: true},
    slots_pci: { type: Number, select: true},
    portas_ethernet: { type: Number, select: true},
    usb_2: { type: Number, select: true},
    usb_3: { type: Number, select: true},
    usb_31: { type: Number, select: true},
    usb_typec: { type: Boolean, select: true},
    video_onboard: { type: Boolean, select: true},
    suporte_ecc: { type: Boolean, select: true},
    rede_wireless: { type: Boolean, select: true},
    bluetooth: { type: Boolean, select: true},
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

PlacaMaeSchema.plugin(mongoosePaginate)

PlacaMaeSchema.virtual('imagem_url').get(function(this: any)  {
    return `http://192.168.1.100:3333/arquivos/placas-mae/${this.imagem}`
})

PlacaMaeSchema.pre('remove', function(this: Document | any) {
return promisify(fs.unlink)(
    path.resolve(__dirname,'..','..','uploads','placas-mae',this.imagem)
)
})

const PlacaMaeModel = model<IPlacaMae>('PlacaMae', PlacaMaeSchema)

export default PlacaMaeModel