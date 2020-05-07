import { Schema, model } from 'mongoose'

import { ILoja } from './interfaces/lojaInterface'

const LojaSchema = new Schema({
    nome: String,
    imagem: String,
    urlSite: String
}, { toJSON: { virtuals: true } })

LojaSchema.virtual('imagem_url').get(function(this: any) {
    return `http://192.168.1.100:3333/arquivos/lojas/${this.imagem}`
})

const LojaModel = model<ILoja>('Loja', LojaSchema)

export default LojaModel