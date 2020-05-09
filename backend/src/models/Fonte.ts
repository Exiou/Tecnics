import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import { IFonte } from './interfaces/produtoInterface'

const FonteSchema = new Schema<IFonte>({
    imagem: String,
    nome: String,
    modelo: String,
    fabricante: String,
    serie: String,
    tipo: String,
    modular: String,
    certificado: String,
    saida: String,
    potencia: Number,
    eficiencia: Number,
    peso: Number,
    conectores_pcie_6_pinos: Number,
    conectores_pcie_6_2_pinos: Number,
    fanless: Boolean,
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

FonteSchema.plugin(mongoosePaginate)

FonteSchema.virtual('imagem_url').get(function(this: any)  {
    return `http://192.168.1.100:3333/arquivos/fontes/${this.imagem}`
})

FonteSchema.pre('remove', function(this: Document | any) {
return promisify(fs.unlink)(
    path.resolve(__dirname,'..','..','uploads','fontes',this.imagem)
)
})

const FonteModel = model<IFonte>('Fonte', FonteSchema)

export default FonteModel