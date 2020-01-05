const mongoose = require('mongoose'); // Importar mongoose
const mongoosePaginate = require('mongoose-paginate-v2')

// Criar o esquema do banco de dados
const PlacaVideoSchema = new mongoose.Schema({
    imagem:String,
    modelo:String,
    preco: Number,
    fabricante: String,
    memoria: Number,
    consumo: Number,
    cor: String,
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
    return `http://192.168.15.9:3333/arquivos/placas-video/${this.imagem}`
})


module.exports = mongoose.model('PlacaVideo', PlacaVideoSchema);