import { Document } from 'mongoose'

import { ILojas } from './lojaInterface'

export default interface IProcessador extends Document {
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
    lojas: ILojas[],
    imagem_url: string
}
