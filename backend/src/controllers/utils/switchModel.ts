import ProcessadorModel from "../../models/Processador";

export default async function switchModel(modelName: any) {
    switch (modelName) {
        case 'processadores':
            return ProcessadorModel
            break;
        default:
            break;
    }
}