const mongoose = require('mongoose')

const LojaSchema = new mongoose.Schema({
    nome:String,
    imagem:String,
    urlSite:String,
}, {
    toJSON: {
        virtuals: true
    }
})

LojaSchema.virtual('imagem_url').get(function() {
    return `http://192.168.1.102:3333/arquivos/lojas/${this.imagem}`
})

module.exports = mongoose.model('Loja', LojaSchema);