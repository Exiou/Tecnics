const mongoose = require('mongoose'); // Importar mongoose

// Criar o esquema do banco de dados
const PlacaVideoSchema = new mongoose.Schema({
    preco: Number,
    fabricante: String,
    chipset: String,
    memoria: String,
    interface: String,
    crossfire: String,
    core_clock: Number,
    portas_dvi: Number,
    portas_hdmi: Number,
    portas_mini_hdmi: Number,
    portas_display_port: Number,
    portas_mini_display_port: Number,
    slots: Number,
    comprimento: Number,
    consumo: Number,
    frame_sync: Boolean,
    fanless: Boolean,
    cor: String
});

module.exports = mongoose.model('PlacaVideo', PlacaVideoSchema);