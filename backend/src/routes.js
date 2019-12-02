const express = require('express')

const BuildController = require('./controllers/BuildController')
const ProcessadorController = require('./controllers/ProcessadorController')

const routes = express.Router()

routes.post('/build', BuildController.store);

routes.post('/processador', ProcessadorController.store);

module.exports = routes; // Exportar routes