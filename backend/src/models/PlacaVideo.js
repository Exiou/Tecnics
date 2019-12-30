const mongoose = require('mongoose'); // Importar mongoose

// Criar o esquema do banco de dados
const PlacaVideoSchema = new mongoose.Schema({
    imagem:String,
    modelo:String,
    preco: Number,
    fabricante: String,
    memoria: Number,
    consumo: Number,
    cor: String
}, {
    toJSON: {
        virtuals: true,
    },
});

PlacaVideoSchema.virtual('imagem_url').get(function() {
    return `http://192.168.15.9:3333/arquivos/placas-video/${this.imagem}`
})


module.exports = mongoose.model('PlacaVideo', PlacaVideoSchema);