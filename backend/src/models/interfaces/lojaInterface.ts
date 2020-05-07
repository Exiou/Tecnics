import { Document, Schema } from 'mongoose'

export interface ILoja extends Document {
    nome: string,
    imagem: string,
    urlSite: string,
    imagem_url: string
}


export interface ILojas {
    idLoja: Schema.Types.ObjectId,
    preco: number,
    urlProduto: string
}