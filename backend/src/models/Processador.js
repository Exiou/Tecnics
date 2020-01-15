const mongoose = require('mongoose'); // Importar mongoose
const mongoosePaginate = require('mongoose-paginate-v2')

// Criar o esquema do banco de dados
const ProcessadorSchema = new mongoose.Schema({
    imagem:String,
    modelo:String,
    preco: Number,
    fabricante: String,
    nucleo: Number,
    frequencia: Number,
    consumo: Number,
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