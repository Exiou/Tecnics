const Processador = require('../models/Processador')

module.exports = {
    async index(req, res){

        var { page, limit } = req.query

        if (page === undefined){
            page = 1
        }

        if (limit === undefined){
                limit = 10
        }

        const processadores = await Processador.paginate({}, { page, limit })

        return res.json(processadores)


    },

    async show(req, res){

        const processadores = await Processador.findById(req.params.id)

        return res.json(processadores)

    }
}