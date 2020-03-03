const mongoose = require('mongoose'); // Importar mongoose

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

// Criar o esquema do banco de dados
const GabineteSchema = new mongoose.Schema({
    imagem: r_string,
    nome: r_string,
    modelo:r_string,
    fabricante: r_string,
    tipo: r_string,
    cor: r_string,
    formato_placa_mae: r_string,
    baia_externa_525: r_number,
    baia_externa_350: r_number,
    baia_interna_350: r_number,
    baia_interna_250: r_number,
    slot_full_height: r_number,
    slot_half_height: r_number,
    fonte: r_boolean,
    janela_lateral: r_boolean,
    painel_frontal_usb3: r_boolean,
    filtro_removivel: r_boolean,
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

GabineteSchema.plugin(mongoosePaginate)

GabineteSchema.virtual('imagem_url').get(function() {
    return `http://192.168.1.102:3333/arquivos/gabinetes/${this.imagem}`
})

module.exports = mongoose.model('Gabinete', GabineteSchema);