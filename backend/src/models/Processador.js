const mongoose = require('mongoose'); // Importar mongoose

// Criar o esquema do banco de dados
const ProcessadorSchema = new mongoose.Schema({
    modelo:String,
    preco: Number,
    fabricante: String,
    nucleo: Number,
    frequencia: Number,
    consumo: Number
});

module.exports = mongoose.model('Processador', ProcessadorSchema);