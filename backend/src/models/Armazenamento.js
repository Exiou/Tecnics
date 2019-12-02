const mongoose = require('mongoose'); // Importar mongoose

// Criar o esquema do banco de dados
const MemoriaSchema = new mongoose.Schema({
    preco: Number,
    fabricante: String,
    capacidade: Number,
    tipo: String,
    interface: String,
    formato: String,
    buffer_cache: String,
    intellipower: Boolean,
    hibrido: Boolean
});

module.exports = mongoose.model('Memoria', MemoriaSchema);