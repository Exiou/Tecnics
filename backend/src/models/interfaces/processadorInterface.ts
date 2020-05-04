import { Document, Schema } from 'mongoose'

export interface a {
    paginate(): void
}

export interface IProcessador extends Document {
    imagem: string,
    nome: string,
    modelo: string,
    fabricante: string,
    serie: string,
    familia: string,
    socket: string,
    graficos_integrados: string,
    nucleo: number,
    frequencia: number,
    frequencia_turbo:number,
    consumo: number,
    arquitetura: number,
    thread: number,
    litografia: number,
    cooler_incluso: boolean,
    multithreading: boolean,
    suporte_ecc: boolean,
    virtualizacao: boolean,
    lojas: ILojas[]
}

export interface ILojas {
    idLoja: Schema.Types.ObjectId,
    preco: number,
    urlProduto: string
}