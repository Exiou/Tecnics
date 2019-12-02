const mongoose = require('mongoose'); // Importar mongoose

// Criar o esquema do banco de dados
const PlacaMaeSchema = new mongoose.Schema({
    preco: Number,
    fabricante: String,
    socket: String,
    formato: String,
    chipset: String,
    crossfire: String,
    portas_sata_3gb: Number,
    portas_sata_6gb: Number,
    portas_sata_express: Number,
    portas_m2: Number,
    portas_msata: Number,
    slots_ram: Number,
    ram_max: Number,
    tipo_memoria: String,
    slots_pcie_x16: Number,
    slots_pcie_x4: Number,
    slots_pcie_x1: Number,
    slots_pci: Number,
    portas_ethernet: Number,
    usb_2: Number,
    usb_3: Number,
    usb_31: Number,
    usb_typec: Boolean,
    video_onboard: Boolean,
    suporte_ecc: Boolean,
    cor: String,
    rede_wireless: Boolean,
    bluetooth: Boolean
});

module.exports = mongoose.model('PlacaMae', PlacaMaeSchema);