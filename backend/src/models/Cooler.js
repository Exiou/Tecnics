const mongoose = require('mongoose'); // Importar mongoose

// Criar o esquema do banco de dados
const CoolerSchema = new mongoose.Schema({
    imagem: String,
    nome: String,
    modelo:String,
    preco: [Number],
    fabricante: String,
    altura: Number,
    rolamento: String,
    socket: String,
    radiador: String,
    cor: String,
    fanless: Boolean
});

module.exports = mongoose.model('Cooler', CoolerSchema);