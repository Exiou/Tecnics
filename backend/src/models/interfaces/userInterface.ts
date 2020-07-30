import { Document, Schema } from 'mongoose'

export default interface IUser extends Document {
    nome: string
    imagem: string
    email: string
    senha: string
    favoritos: [{
      produto: Schema.Types.ObjectId,
      modelo: string
    }]
    imagem_url: string
  }
