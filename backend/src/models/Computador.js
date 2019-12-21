const mongoose = require('mongoose'); // Importar mongoose

// Criar o esquema do banco de dados
const ComputadorSchema = new mongoose.Schema({

    //tem que complementar mais aqui pora

    processador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Processador'
    }
});

module.exports = mongoose.model('Computador', ComputadorSchema);