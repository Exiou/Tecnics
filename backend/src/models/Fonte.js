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
const FonteSchema = new mongoose.Schema({
    imagem: r_string,
    nome: r_string,
    modelo:r_string,
    fabricante: r_string,
    tipo: r_string,
    modular: r_string,
    certificado: r_string,
    potencia: r_number,
    fanless: r_boolean,
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

FonteSchema.plugin(mongoosePaginate)

FonteSchema.virtual('imagem_url').get(function() {
    return `http://192.168.1.102:3333/arquivos/fontes/${this.imagem}`
})

module.exports = mongoose.model('Fonte', FonteSchema);