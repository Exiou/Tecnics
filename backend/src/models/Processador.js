const mongoose = require('mongoose'); // Importar mongoose
const mongoosePaginate = require('mongoose-paginate-v2')

// Criar o esquema do banco de dados
const ProcessadorSchema = new mongoose.Schema({
    imagem:String,
    nome: String,
    modelo: String,
    fabricante: String,
    serie: String,
    familia: String,
    socket: String,
    graficos_integrados: String,
    preco: [Number],
    nucleo: Number,
    frequencia: Number,
    frequencia_turbo:Number,
    consumo: Number,
    arquitetura: Number,
    thread: Number,
    litografia: Number,
    cooler_incluso: Boolean,
    multithreading: Boolean,
    suporte_ecc: Boolean,
    virtualizacao: Boolean,
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

ProcessadorSchema.plugin(mongoosePaginate)

ProcessadorSchema.virtual('imagem_url').get(function() {
    return `http://192.168.1.102:3333/arquivos/processadores/${this.imagem}`
})

module.exports = mongoose.model('Processador', ProcessadorSchema);