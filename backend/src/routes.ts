import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'
import FavoriteController from './controllers/FavoriteController'
import ProdutoController from './controllers/ProdutoController'
import LojaController from './controllers/LojaController'
import Loja from './models/Loja'

// eslint-disable-next-line no-unused-expressions
Loja

const routes = [
  UserController.routes,
  SessionController.routes,
  FavoriteController.routes,
  ProdutoController.routes,
  LojaController.routes
]

export default routes
