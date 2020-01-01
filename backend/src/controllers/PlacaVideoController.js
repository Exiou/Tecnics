const PlacaVideo = require('../models/PlacaVideo')

module.exports = {
    async index(req, res){

        var { page, limit } = req.query

        if (page === undefined){
            page = 1
        }

        if (limit === undefined){
                limit = 10
        }

        const placasDeVideo = await PlacaVideo.paginate({}, { page, limit })

        return res.json(placasDeVideo)


    },

    async show(req, res){

        const placasDeVideo = await PlacaVideo.findById(req.params.id)

        return res.json(placasDeVideo)

    }
}