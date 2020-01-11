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

        const options = {
            page,
            limit,
            select: {
                lojas:0,
                urlProduto:0
            }
        }

        const processadores = await Processador.paginate({}, options)

        return res.json(processadores)

    }catch(err){
        return res.send(`Deu erro, ${err}`)
    }



    },

    async show(req, res){
        try{

            const processadores = await Processador.findById(req.params.id).populate('lojas').exec()

            return res.json(processadores)

        }catch(err){
            return res.send(`Deu erro, ${err}`)
            
        }
    }
}