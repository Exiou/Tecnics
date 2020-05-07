import { Document, Schema } from 'mongoose'

export interface IUser extends Document {
    nome: string
    imagem: string
    email: string
    senha: string
    favoritos?: Schema.Types.ObjectId
    imagem_url: string
  }