const { Router } = require('express')

const ProcessadorController = require('./controllers/ProcessadorController')
const PlacaVideoController = require('./controllers/PlacaVideoController')

const routes = Router()

routes.get('/processadores', ProcessadorController.index);
routes.get('/processadores/:id', ProcessadorController.show);

routes.get('/placas-video', PlacaVideoController.index);
routes.get('/placas-video/:id', PlacaVideoController.show);

module.exports = routes; // Exportar routes