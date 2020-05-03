import UserController from './controllers/UserController'

const userController = new UserController()

const routes = [userController.routes]

export default routes