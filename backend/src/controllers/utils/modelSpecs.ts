import { PaginateModel } from "mongoose";
import { IProduto } from '../../models/interfaces/produtoInterface'
import getFilters from './getFilters'


export default async function modelSpecs(modelName: PaginateModel<IProduto>) {
    let keys = Object.keys(modelName.schema.obj)
    const values: any = Object.values(modelName.schema.obj)

    keys = keys.filter(s => s !== 'imagem' && s !== 'nome' && s !== 'modelo' && s !== 'lojas')
    
    const types: [Function] = values.map((value: { type: any; }) => {
        return value.type || Object
    })

    let paths: {keys: string, types: string}[] = []

    for(let i = 0;i<keys.length;i++){
        paths.push({ keys: keys[i], types: types[i].name })
    }
    

    let filters = await getFilters(modelName, keys)

    return { filters, paths }
}