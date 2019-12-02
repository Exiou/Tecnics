const mongoose = require('mongoose'); // Importar mongoose

// Criar o esquema do banco de dados
const GabineteSchema = new mongoose.Schema({
    preco: Number,
    fabricante: String,
    tipo: String,
    cor: String,
    fonte: Boolean,
    janela_lateral: Boolean,
    painel_frontal_usb3: Boolean,
    filtro_removivel: Boolean,
    formato_placa_mae: String,
    baia_externa_525: Number,
    baia_externa_350: Number,
    baia_interna_350: Number,
    baia_interna_250: Number,
    slot_full_height: Number,
    slot_half_height: Number,
});

module.exports = mongoose.model('Gabinete', GabineteSchema);