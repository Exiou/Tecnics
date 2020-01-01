const PlacaVideo = require('../models/PlacaVideo')

module.exports = {
    async index(req, res){

        const placasDeVideo = await PlacaVideo.paginate()

        return res.json(placasDeVideo)


    },

    async show(req, res){

        const placasDeVideo = await PlacaVideo.findById(req.params.id)

        return res.json(placasDeVideo)

    }
}