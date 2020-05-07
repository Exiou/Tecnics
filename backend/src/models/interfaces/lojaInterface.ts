import { Document } from 'mongoose'

export interface ILoja extends Document {
    nome: string,
    imagem: string,
    urlSite: string,
    imagem_url: string
}


export interface ILojas {
    idLoja: string,
    preco: number,
    urlProduto: string
}