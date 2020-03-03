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
const ArmazenamentoSchema = new mongoose.Schema({
    imagem: r_string,
    nome: r_string,
    modelo:r_string,
    fabricante: r_string,
    tipo: r_string,
    interface: r_string,
    formato: r_string,
    buffer_cache: r_string,
    capacidade: r_number,
    intellipower: r_boolean,
    hibrido: r_boolean,
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

ArmazenamentoSchema.plugin(mongoosePaginate)

ArmazenamentoSchema.virtual('imagem_url').get(function() {
    return `http://192.168.1.102:3333/arquivos/armazenamentos/${this.imagem}`
})

module.exports = mongoose.model('Armazenamento', ArmazenamentoSchema);