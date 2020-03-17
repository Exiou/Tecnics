const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

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

const FonteSchema = new mongoose.Schema({
    imagem: r_string,
    nome: r_string,
    modelo:r_string,
    fabricante: r_string,
    serie: r_string,
    tipo: r_string,
    modular: r_string,
    certificado: r_string,
    saida: r_string,
    potencia: r_number,
    eficiencia: r_number,
    peso: r_number,
    conectores_pcie_6_pinos: r_number,
    conectores_pcie_6_2_pinos: r_number,
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