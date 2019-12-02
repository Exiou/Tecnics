const mongoose = require('mongoose'); // Importar mongoose

// Criar o esquema do banco de dados
const MemoriaSchema = new mongoose.Schema({
    preco: Number,
    fabricante: String,
    velocidade: String,
    tipo: String,
    capacidade: String,
    voltagem: Number,
    cas_latency: Number,
    suporte_ecc: Boolean,
    registrada: Boolean,
    dissipador: Boolean,
    cor: String
});

module.exports = mongoose.model('Memoria', MemoriaSchema);