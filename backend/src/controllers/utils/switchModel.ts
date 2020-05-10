import ProcessadorModel from "../../models/Processador";
import PlacaVideoModel from "../../models/PlacaVideo";
import PlacaMaeModel from "../../models/PlacaMae";
import MemoriaModel from "../../models/Memoria";
import GabineteModel from "../../models/Gabinete";
import FonteModel from "../../models/Fonte";
import CoolerModel from "../../models/Cooler";
import ArmazenamentoModel from "../../models/Armazenamento";

export default async function switchModel(modelName: any) {
    switch (modelName) {
        case 'processadores':
            return ProcessadorModel
            break;
        case 'placas-video':
            return PlacaVideoModel
            break;
        case 'placas-mae':
            return PlacaMaeModel
            break;
        case 'memorias':
            return MemoriaModel
            break;
        case 'gabinetes':
            return GabineteModel
            break;
        case 'fontes':
            return FonteModel
            break;
        case 'coolers':
            return CoolerModel
            break;
        case 'armazenamentos':
            return ArmazenamentoModel
            break;
        default:
            break;
    }
}