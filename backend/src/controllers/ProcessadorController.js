const Processador = require('../models/Processador')

module.exports = {
    async store(req, res){
        const { preco, fabricante, serie, socket, graficos_integrados, nucleo, frequencia, consumo } = req.body;

        let processador = await Processador.findOne({ preco, fabricante, serie, socket, graficos_integrados, nucleo, frequencia, consumo });

        if(!processador){
            processador = await Processador.create({ preco, fabricante, serie, socket, graficos_integrados, nucleo, frequencia, consumo })
        }

        return res.json(processador)
    }
}