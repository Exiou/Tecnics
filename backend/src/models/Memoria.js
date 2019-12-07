const mongoose = require('mongoose'); // Importar mongoose

// Criar o esquema do banco de dados
const MemoriaSchema = new mongoose.Schema({
    modelo:String,
    preco: Number,
    fabricante: String,
    velocidade: String,
    tipo: String,
    capacidade: String,
    voltagem: Number,
    dissipador: Boolean,
    cor: String
});

module.exports = mongoose.model('Memoria', MemoriaSchema);