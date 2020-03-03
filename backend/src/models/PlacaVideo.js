const mongoose = require('mongoose'); // Importar mongoose
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

// Criar o esquema do banco de dados
const PlacaVideoSchema = new mongoose.Schema({
    imagem: r_string,
    nome: r_string,
    modelo: r_string,
    fabricante: r_string,
    serie: r_string,
    chipset: r_string,
    tipo_memoria: r_string,
    interface: r_string,
    sli_crossfire: r_string,
    cor: r_string,   
    tamanho_memoria: r_number,
    core_clock: r_number,
    boost_clock: r_number,
    comprimento: r_number,
    portas_dvi: r_number,
    portas_hdmi: r_number,
    portas_mini_hdmi: r_number,
    portas_display_port: r_number,
    portas_mini_display_port: r_number,
    slots_ocupados: r_number,
    consumo: r_number,
    fanless: r_boolean,
    water_cooled: r_boolean,
    suporte_gsync: r_boolean,
    led_rgb: r_boolean,
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

PlacaVideoSchema.plugin(mongoosePaginate)

PlacaVideoSchema.virtual('imagem_url').get(function() {
    return `http://192.168.1.102:3333/arquivos/placas-video/${this.imagem}`
})


module.exports = mongoose.model('PlacaVideo', PlacaVideoSchema);