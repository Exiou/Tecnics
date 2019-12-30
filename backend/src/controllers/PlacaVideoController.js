const PlacaVideo = require('../models/PlacaVideo')

module.exports = {
    async index(req, res){

        const placasDeVideo = await PlacaVideo.find()

        return res.json(placasDeVideo)


    },

    async show(req, res){

        const placasDeVideo = await PlacaVideo.findById(req.params.id)

        return res.json(placasDeVideo)

    }
}