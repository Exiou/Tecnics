import UserController from './controllers/UserController'
import ProdutoController from './controllers/ProdutoController'
import LojaController from './controllers/LojaController'
import Loja from './models/Loja'

Loja

const routes = [
    UserController.routes,
    ProdutoController.routes,
    LojaController.routes
]

export default routes