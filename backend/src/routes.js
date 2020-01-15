const { Router } = require('express')

const BuildController = require('./controllers/BuildController')
const ProcessadorController = require('./controllers/ProcessadorController')
const PlacaVideoController = require('./controllers/PlacaVideoController')

const routes = Router()

routes.post('/build', BuildController.store);

routes.get('/processadores', ProcessadorController.index);
routes.get('/processadores/:id', ProcessadorController.show);

routes.get('/placas-video', PlacaVideoController.index);
routes.get('/placas-video/:id', PlacaVideoController.show);

module.exports = routes; // Exportar routes