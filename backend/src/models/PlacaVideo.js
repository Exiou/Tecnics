const mongoose = require('mongoose'); // Importar mongoose

// Criar o esquema do banco de dados
const PlacaVideoSchema = new mongoose.Schema({
    modelo:String,
    preco: Number,
    fabricante: String,
    memoria: String,
    consumo: Number,
    cor: String
});

module.exports = mongoose.model('PlacaVideo', PlacaVideoSchema);