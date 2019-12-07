const mongoose = require('mongoose'); // Importar mongoose

// Criar o esquema do banco de dados
const PlacaMaeSchema = new mongoose.Schema({
    modelo:String,
    preco: Number,
    fabricante: String,
    formato: String,
    video_onboard: Boolean,
    cor: String,
    rede_wireless: Boolean,
    bluetooth: Boolean
});

module.exports = mongoose.model('PlacaMae', PlacaMaeSchema);