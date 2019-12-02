const mongoose = require('mongoose'); // Importar mongoose

// Criar o esquema do banco de dados
const ProcessadorSchema = new mongoose.Schema({
    preco: Number,
    fabricante: String,
    serie: String,
    socket: String,
    graficos_integrados: String,
    nucleo: Number,
    frequencia: Number,
    consumo: Number
});

module.exports = mongoose.model('Processador', ProcessadorSchema);