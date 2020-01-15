const Processador = require('../models/Processador')
const Loja = require('../models/Loja')

module.exports = {
    async index(req, res){
        try{
        const {
            page = 1,
            limit = 10,
            precoMin = 400,
            precoMax = 2800,
            nucleoMin = 1,
            nucleoMax = 32,
            freqMin = 1.5,
            freqMax = 5,
            consumoMin = 25,
            consumoMax = 250,
            fab = 'AMD Intel',
            ordenar = '',
        } = req.query

        const fabArray = fab.split(' ').map(fab => fab.trim())

        const query = {
            $and: [
                { preco: { $gte: precoMin }},
                { preco: { $lte: precoMax }},
                { nucleo: { $gte: nucleoMin }},
                { nucleo: { $lte: nucleoMax }},
                { frequencia: { $gte: freqMin }},
                { frequencia: { $lte: freqMax }},
                { consumo: { $gte: consumoMin }},
                { consumo: { $lte: consumoMax }},
                { fabricante: { $in: fabArray }}
            ]
        }
        
        const options = {
            page,
            limit,
            select: {
                lojas:0,
                urlProduto:0
            },
            sort: ordenar
        }

        const processadores = await Processador.paginate(query, options)

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