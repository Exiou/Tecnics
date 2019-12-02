const Computador = require('../models/Computador')

module.exports = {
    async store(req, res){
        const { processador_id } = req.headers;

        const build = await Computador.create({
            processador: processador_id
        })

        await build.populate('processador').execPopulate();

        return res.json(build)
    }
}
