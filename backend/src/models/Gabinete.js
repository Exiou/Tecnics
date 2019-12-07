const mongoose = require('mongoose'); // Importar mongoose

// Criar o esquema do banco de dados
const GabineteSchema = new mongoose.Schema({
    modelo:String,
    preco: Number,
    fabricante: String,
    tipo: String,
    cor: String,
    janela_lateral: Boolean,
    formato_placa_mae: String
});

module.exports = mongoose.model('Gabinete', GabineteSchema);