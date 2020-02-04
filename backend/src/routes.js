const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')

const ProcessadorController = require('./controllers/ProcessadorController')
const PlacaVideoController = require('./controllers/PlacaVideoController')

const Teste = require('./models/teste')

routes.get('/processadores', ProcessadorController.index);
routes.get('/processadores/:id', ProcessadorController.show);

routes.get('/placas-video', PlacaVideoController.index);
routes.get('/placas-video/:id', PlacaVideoController.show);

routes.post('/teste', multer(multerConfig).single('file'), async (req,res) => {
    const {
        originalname: name,
        size,
        filename: key
    } = req.file

    const teste = await Teste.create({
        name,
        size,
        key,
        url: ''
    })

    return res.json(teste)
})

module.exports = routes; // Exportar routes