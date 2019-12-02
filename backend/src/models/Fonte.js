const mongoose = require('mongoose'); // Importar mongoose

// Criar o esquema do banco de dados
const FonteSchema = new mongoose.Schema({
    preco: Number,
    fabricante: String,
    potencia: Number,
    tipo: String,
    modular: String,
    certificado: String,
    fanless: Boolean
});

module.exports = mongoose.model('Fonte', FonteSchema);