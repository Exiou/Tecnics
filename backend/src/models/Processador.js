const mongoose = require('mongoose'); // Importar mongoose

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

ProcessadorSchema.virtual('imagem_url').get(function() {
    return `http://192.168.1.108:3333/arquivos/processadores/${this.imagem}`
})

module.exports = mongoose.model('Processador', ProcessadorSchema);