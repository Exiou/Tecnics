const mongoose = require('mongoose')

const LojaSchema = new mongoose.Schema({
    nome:String,
    imagem:String,
    urlSite:String,
    produtosAnunciados:Number
}, {
    toJSON: {
        virtuals: true
    }
})

LojaSchema.virtual('imagem_url').get(function() {
    return `http://192.168.15.9:3333/arquivos/lojas/${this.imagem}`
})

module.exports = mongoose.model('Loja', LojaSchema);