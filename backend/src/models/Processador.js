//importar dependências
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

//atalhozinho pra colocar os campos como required (obrigatórios no cadastro)
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
const ProcessadorSchema = new mongoose.Schema({
    imagem: r_string,
    nome: r_string,
    modelo: r_string,
    fabricante: r_string,
    serie: r_string,
    familia: r_string,
    socket: r_string,
    graficos_integrados: r_string,
    nucleo: r_number,
    frequencia: r_number,
    frequencia_turbo:r_number,
    consumo: r_number,
    arquitetura: r_number,
    thread: r_number,
    litografia: r_number,
    cooler_incluso: r_boolean,
    multithreading: r_boolean,
    suporte_ecc: r_boolean,
    virtualizacao: r_boolean,
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

//usar plugin mongoosePaginate
ProcessadorSchema.plugin(mongoosePaginate)

//"virtualizar" as imagens no servidor local
ProcessadorSchema.virtual('imagem_url').get(function() {
    return `http://192.168.1.104:3333/arquivos/processadores/${this.imagem}`
})

//exportar model
module.exports = mongoose.model('Processador', ProcessadorSchema);
