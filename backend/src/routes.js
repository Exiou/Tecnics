const express = require('express')

const BuildController = require('./controllers/BuildController')
const ProcessadorController = require('./controllers/ProcessadorController')

const routes = express.Router()

routes.post('/build', BuildController.store);

routes.get('/processadores', ProcessadorController.index);
routes.get('/processadores/:modelo', ProcessadorController.show);

module.exports = routes; // Exportar routes