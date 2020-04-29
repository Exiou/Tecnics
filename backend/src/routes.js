//importar dependências e configurações do multer
const routes = require('express').Router()
const multer = require('multer')
const uploadConfig = require('./config/multer')

//importar arquivos
const ProcessadorController = require('./controllers/ProcessadorController')
const PlacaVideoController = require('./controllers/PlacaVideoController')
const PlacaMaeController = require('./controllers/PlacaMaeController')
const MemoriaController = require('./controllers/MemoriaController')
const GabineteController = require('./controllers/GabineteController')
const FonteController = require('./controllers/FonteController')
const ArmazenamentoController = require('./controllers/ArmazenamentoController')
const CoolerController = require('./controllers/CoolerController')

const UserController = require('./controllers/UserController')
const SessionController = require('./controllers/SessionController')

routes.get('/users', UserController.show)
routes.post('/users', multer(uploadConfig('users')).single('file'), UserController.store)
routes.put('/users/:idProduto', UserController.update)

routes.post('/sessions', SessionController.store)

//CRUD de cada produto
routes.get('/processadores', ProcessadorController.index); //index (mostrar todos os produtos)
routes.get('/processadores/:id', ProcessadorController.show); //show (mostrar apenas um produto selecionado)
routes.post('/processadores', multer(uploadConfig('processadores')).array('files'), ProcessadorController.store) //store (armazenar produtos)
routes.put('/processadores/:id', ProcessadorController.update) //update (atualizar um produto)
routes.delete('/processadores/:id', ProcessadorController.destroy) //destroy (deletar um produto)

routes.get('/placas-video', PlacaVideoController.index);
routes.get('/placas-video/:id', PlacaVideoController.show);
routes.post('/placas-video', multer(uploadConfig('placas-video')).array('files'), PlacaVideoController.store)
routes.put('/placas-video/:id', PlacaVideoController.update)
routes.delete('/placas-video/:id', PlacaVideoController.destroy)

routes.get('/placas-mae', PlacaMaeController.index);
routes.get('/placas-mae/:id', PlacaMaeController.show);
routes.post('/placas-mae', multer(uploadConfig('placas-mae')).array('files'), PlacaMaeController.store)
routes.put('/placas-mae/:id', PlacaMaeController.update)
routes.delete('/placas-mae/:id', PlacaMaeController.destroy)

routes.get('/memorias', MemoriaController.index);
routes.get('/memorias/:id', MemoriaController.show);
routes.post('/memorias', multer(uploadConfig('memorias')).array('files'), MemoriaController.store)
routes.put('/memorias/:id', MemoriaController.update)
routes.delete('/memorias/:id', MemoriaController.destroy)

routes.get('/gabinetes', GabineteController.index);
routes.get('/gabinetes/:id', GabineteController.show);
routes.post('/gabinetes', multer(uploadConfig('gabinetes')).array('files'), GabineteController.store)
routes.put('/gabinetes/:id', GabineteController.update)
routes.delete('/gabinetes/:id', GabineteController.destroy)

routes.get('/fontes', FonteController.index);
routes.get('/fontes/:id', FonteController.show);
routes.post('/fontes', multer(uploadConfig('fontes')).array('files'), FonteController.store)
routes.put('/fontes/:id', FonteController.update)
routes.delete('/fontes/:id', FonteController.destroy)

routes.get('/armazenamentos', ArmazenamentoController.index);
routes.get('/armazenamentos/:id', ArmazenamentoController.show);
routes.post('/armazenamentos', multer(uploadConfig('armazenamentos')).array('files'), ArmazenamentoController.store)
routes.put('/armazenamentos/:id', ArmazenamentoController.update)
routes.delete('/armazenamentos/:id', ArmazenamentoController.destroy)

routes.get('/coolers', CoolerController.index);
routes.get('/coolers/:id', CoolerController.show);
routes.post('/coolers', multer(uploadConfig('coolers')).array('files'), CoolerController.store)
routes.put('/coolers/:id', CoolerController.update)
routes.delete('/coolers/:id', CoolerController.destroy)


module.exports = routes; // Exportar routes