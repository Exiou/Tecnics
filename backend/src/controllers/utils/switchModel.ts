import ProcessadorModel from '../../models/Processador'
import PlacaVideoModel from '../../models/PlacaVideo'
import PlacaMaeModel from '../../models/PlacaMae'
import MemoriaModel from '../../models/Memoria'
import GabineteModel from '../../models/Gabinete'
import FonteModel from '../../models/Fonte'
import CoolerModel from '../../models/Cooler'
import ArmazenamentoModel from '../../models/Armazenamento'

export default async function switchModel (modelName: any) {
  switch (modelName) {
    case 'processadores':
      return ProcessadorModel

    case 'placas-video':
      return PlacaVideoModel

    case 'placas-mae':
      return PlacaMaeModel

    case 'memorias':
      return MemoriaModel

    case 'gabinetes':
      return GabineteModel

    case 'fontes':
      return FonteModel

    case 'coolers':
      return CoolerModel

    case 'armazenamentos':
      return ArmazenamentoModel

    default:
      break
  }
}
