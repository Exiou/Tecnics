const Processador = require('../models/Processador')
const Loja = require('../models/Loja')

module.exports = {
    async index(req, res){
        try{
        var { page, limit } = req.query

        if (page === undefined){
            page = 1
        }

        if (limit === undefined){
                limit = 10
        }

        const processadores = await Processador.paginate({}, { page, limit })

        return res.json(processadores) PESQUISA AMANHA SE DA PRA FILTRAR OS CAMPOS AQUI VALEU

    }catch(err){
        return res.send(`Deu erro, ${err}`)
    }



    },

    async show(req, res){

        const processadores = await Processador.findById(req.params.id).populate('lojas').exec()

        return res.json(processadores)

    }
}