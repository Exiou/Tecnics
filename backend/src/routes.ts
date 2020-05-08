import UserController from './controllers/UserController'
import ProcessadorController from './controllers/ProcessadorController'
import LojaController from './controllers/LojaController'
import Loja from './models/Loja'

Loja

const routes = [UserController.routes, ProcessadorController.routes, LojaController.routes]

export default routes