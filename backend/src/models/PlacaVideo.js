const mongoose = require('mongoose'); // Importar mongoose
const mongoosePaginate = require('mongoose-paginate-v2')

// Criar o esquema do banco de dados
const PlacaVideoSchema = new mongoose.Schema({
    imagem: String,
    nome: String,
    modelo: String,
    fabricante: String,
    serie: String,
    chipset: String,
    tipo_memoria: String,
    interface: String,
    sli_crossfire: String,
    cor: String,
    preco: [Number],
    tamanho_memoria: Number,
    core_clock: Number,
    boost_clock: Number,
    comprimento: Number,
    portas_dvi: Number,
    portas_hdmi: Number,
    portas_mini_hdmi: Number,
    portas_display_port: Number,
    portas_mini_display_port: Number,
    slots_ocupados: Number,
    consumo: Number,
    fanless: Boolean,
    water_cooled: Boolean,
    suporte_gsync: Boolean,
    led_rgb: Boolean,
    lojas:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Loja'
    }],
    urlProduto:[String]
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