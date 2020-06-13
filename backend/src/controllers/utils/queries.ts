//importa essa funçãozinha que transforma uma string em array
export const queryLoja = (queries: any, paths: any, precoMin: number, precoMax: number, buscarNome: any, buscarModelo: any, idLoja: any) => {
    let query: any = {
        $and: [
            { nome: { $regex: `${buscarNome}`, $options: 'i' } },
            { modelo: { $regex: `${buscarModelo}`, $options: 'i' } },
            { lojas: { $elemMatch: { preco: { $gte: precoMin }}}},
            { lojas: { $elemMatch: { preco: { $lte: precoMax }}}},
            { lojas: { $elemMatch: { idLoja: { $eq: idLoja } } } },
        ]
    }

    for (const path of paths) {
        if(queries[`${path.keys}`]){
            if(path.types == 'String' || 'Boolean'){
                const filter = JSON.parse(`{ "${path.keys}": { "$in": [] } }`)
                filter[`${path.keys}`]['$in'] = queries[`${path.keys}`]
                query.$and.push(filter)
            }
        }
    }

    return query
}

export const queryProduto = (queries: any, paths: any, precoMin: number, precoMax: number, buscarNome: any, buscarModelo: any) => {
    let query: any = {
        $and: [
            { nome: { $regex: `${buscarNome}`, $options: 'i' } },
            { modelo: { $regex: `${buscarModelo}`, $options: 'i' } },
            { lojas: { $elemMatch: { preco: { $gte: precoMin }}}},
            { lojas: { $elemMatch: { preco: { $lte: precoMax }}}},
        ]
    }

    for (const path of paths) {
        if(queries[`${path.keys}`]){
            if(path.types == 'String' || 'Boolean'){
                const filter = JSON.parse(`{ "${path.keys}": { "$in": [] } }`)
                filter[`${path.keys}`]['$in'] = queries[`${path.keys}`]
                query.$and.push(filter)
            }
        }
    }

    return query
}