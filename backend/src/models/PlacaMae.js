const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const r_string = {
    type: String,
    required: true 
} 
const r_number = {
    type: Number,
    required: true 
} 
const r_boolean = {
    type: Boolean,
  required: true 
} 

const PlacaMaeSchema = new mongoose.Schema({
    imagem: r_string,
    nome: r_string,
    modelo:r_string,
    fabricante: r_string,
    socket: r_string,
    formato: r_string,
    chipset: r_string,
    crossfire: r_string,
    tipo_memoria: r_string,
    cor: r_string,
    portas_sata_3gb: r_number,
    portas_sata_6gb: r_number,
    portas_sata_express: r_number,
    portas_m2: r_number,
    portas_msata: r_number,
    slots_ram: r_number,
    ram_max: r_number,
    slots_pcie_x16: r_number,
    slots_pcie_x4: r_number,
    slots_pcie_x1: r_number,
    slots_pci: r_number,
    portas_ethernet: r_number,
    usb_2: r_number,
    usb_3: r_number,
    usb_31: r_number,
    usb_typec: r_boolean,
    video_onboard: r_boolean,
    suporte_ecc: r_boolean,
    rede_wireless: r_boolean,
    bluetooth: r_boolean,
    lojas:[
        {
            idLoja: {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Loja'
            },
            preco: r_number,
            urlProduto:r_string
        }
    ]
}, {
    toJSON: {
        virtuals: true,
    },
});

PlacaMaeSchema.plugin(mongoosePaginate)

PlacaMaeSchema.virtual('imagem_url').get(function() {
    return `http://192.168.1.102:3333/arquivos/placas-mae/${this.imagem}`
})


module.exports = mongoose.model('PlacaMae', PlacaMaeSchema);