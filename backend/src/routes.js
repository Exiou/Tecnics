const routes = require('express').Router()
const multer = require('multer')
const uploadConfig = require('./config/multer')

const ProcessadorController = require('./controllers/ProcessadorController')
const PlacaVideoController = require('./controllers/PlacaVideoController')

routes.get('/processadores', ProcessadorController.index);
routes.get('/processadores/:id', ProcessadorController.show);
routes.post('/processadores', multer(uploadConfig('processadores')).array('files'), ProcessadorController.store)

routes.get('/placas-video', PlacaVideoController.index);
routes.get('/placas-video/:id', PlacaVideoController.show);


module.exports = routes; // Exportar routes