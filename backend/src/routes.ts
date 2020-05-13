import UserController from './controllers/UserController'
import ProcessadorController from './controllers/ProcessadorController'
import PlacaVideoController from "./controllers/PlacaVideoController";
import PlacaMaeController from "./controllers/PlacaMaeController";
import MemoriaController from "./controllers/MemoriaController";
import GabineteController from "./controllers/GabineteController";
import FonteController from "./controllers/FonteController";
import CoolerController from "./controllers/CoolerController";
import ArmazenamentoController from "./controllers/ArmazenamentoController";
import LojaController from './controllers/LojaController'
import Loja from './models/Loja'

Loja

const routes = [
    UserController.routes,
    ProcessadorController.routes,
    LojaController.routes,
    PlacaVideoController.routes,
    PlacaMaeController.routes,
    MemoriaController.routes,
    GabineteController.routes,
    FonteController.routes,
    CoolerController.routes,
    ArmazenamentoController.routes
]

export default routes