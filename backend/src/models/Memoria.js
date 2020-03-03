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
const MemoriaSchema = new mongoose.Schema({
    imagem: r_string,
    nome: r_string,
    modelo:r_string,    
    fabricante: r_string,
    velocidade: r_string,
    tipo: r_string,
    capacidade: r_string,
    cor: r_string,
    voltagem: r_number,
    cas_latency: r_number,
    suporte_ecc: r_boolean,
    registrada: r_boolean,
    dissipador: r_boolean,
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

MemoriaSchema.plugin(mongoosePaginate)

MemoriaSchema.virtual('imagem_url').get(function() {
    return `http://192.168.1.102:3333/arquivos/memorias/${this.imagem}`
})

module.exports = mongoose.model('Memoria', MemoriaSchema);