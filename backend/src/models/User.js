const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const refProducts = [
    {
        modelo: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'favoritos.Model'
        },
        Model: {
            type: String,
            enum: ['Processador', 'PlacaVideo', 'PlacaMae', 'Memoria', 'Gabinete', 'Fonte', 'Cooler', 'Armazenamento']
        }
    }
]

const r_string = {
    type: String,
    required: true 
} 

const UserSchema = new mongoose.Schema({
    nome: r_string,
    imagem: r_string,
    email: r_string,
    senha: r_string,
    favoritos: refProducts,
    historico: refProducts,
}, {
    toJSON: {
        virtuals: true
    }
})

UserSchema.virtual('imagem_url').get(function() {
    return `http://192.168.1.100:3333/arquivos/users/${this.imagem}`
})

module.exports = mongoose.model('User', UserSchema);