import { Schema, model, Document } from 'mongoose'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import IUser from './interfaces/userInterface'

const UserSchema = new Schema<IUser>({
  nome: String,
  imagem: String,
  email: String,
  senha: String,
  favoritos: [
    {
      produto: {
        type: Schema.Types.ObjectId,
        refPath: 'favoritos.modelo'
      },
      modelo: {
        type: String,
        enum: ['Processador', 'PlacaVideo', 'PlacaMae', 'Memoria', 'Gabinete', 'Fonte', 'Cooler', 'Armazenamento']
      }
    }
  ]
}, {
  toJSON: { virtuals: true }
})

UserSchema.virtual('imagem_url').get(function (this: any) {
  return `http://192.168.1.100:3333/arquivos/users/${this.imagem}`
})

// UserSchema.pre('findOneAndUpdate', async function(this: Query<any> | any) {
//   const docToUpdate = await this.model.findOne(this.getQuery());
//   return promisify(fs.unlink)(
//     path.resolve(__dirname,'..','..','uploads','users',docToUpdate.imagem)
//   )
// })

UserSchema.pre('remove', function (this: Document | any) {
  return promisify(fs.unlink)(
    path.resolve(__dirname, '..', '..', 'uploads', 'users', this.imagem)
  )
})

const UserModel = model<IUser>('User', UserSchema)

export default UserModel
