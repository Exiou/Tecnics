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
const CoolerSchema = new mongoose.Schema({
    imagem: r_string,
    nome: r_string,
    modelo:r_string,
    fabricante: r_string,
    rolamento: r_string,
    socket: r_string,
    radiador: r_string,
    cor: r_string,
    altura: r_number,
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

CoolerSchema.plugin(mongoosePaginate)

CoolerSchema.virtual('imagem_url').get(function() {
    return `http://192.168.1.102:3333/arquivos/coolers/${this.imagem}`
})

module.exports = mongoose.model('Cooler', CoolerSchema);