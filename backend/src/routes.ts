import UserController from './controllers/UserController'
import ProcessadorController from './controllers/ProcessadorController'

const userController = new UserController()
const processadorController = new ProcessadorController()

const routes = [userController.routes, processadorController.routes]

export default routes