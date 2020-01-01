const Processador = require('../models/Processador')

module.exports = {
    async index(req, res){

        const processadores = await Processador.paginate()

        return res.json(processadores)


    },

    async show(req, res){

        const processadores = await Processador.findById(req.params.id)

        return res.json(processadores)

    }
}