import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import { IPlacaMae } from './interfaces/produtoInterface'

const PlacaMaeSchema = new Schema<IPlacaMae>({
    imagem: String,
    nome: String,
    modelo: String,
    fabricante: String,
    socket: String,
    formato: String,
    chipset: String,
    crossfire: String,
    tipo_memoria: String,
    cor: String,
    portas_sata_3gb: Number,
    portas_sata_6gb: Number,
    portas_sata_express: Number,
    portas_m2: Number,
    portas_msata: Number,
    slots_ram: Number,
    ram_max: Number,
    slots_pcie_x16: Number,
    slots_pcie_x4: Number,
    slots_pcie_x1: Number,
    slots_pci: Number,
    portas_ethernet: Number,
    usb_2: Number,
    usb_3: Number,
    usb_31: Number,
    usb_typec: Boolean,
    Mae_onboard: Boolean,
    suporte_ecc: Boolean,
    rede_wireless: Boolean,
    bluetooth: Boolean,
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