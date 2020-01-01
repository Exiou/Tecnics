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
    consumo: Number
}, {
    toJSON: {
        virtuals: true,
    },
});

ProcessadorSchema.plugin(mongoosePaginate)

mongoosePaginate.paginate.options = { 
    page:  1,
    limit: 10
};


ProcessadorSchema.virtual('imagem_url').get(function() {
    return `http://192.168.15.9:3333/arquivos/processadores/${this.imagem}`
})

module.exports = mongoose.model('Processador', ProcessadorSchema);