// importa essa funçãozinha que transforma uma string em array
export const queryLoja = (buscarNome: any, buscarModelo: any, idLoja: any) => {
  const query: any = {
    $and: [
      { nome: { $regex: `${buscarNome}`, $options: 'i' } },
      { modelo: { $regex: `${buscarModelo}`, $options: 'i' } },
      { lojas: { $elemMatch: { idLoja: { $eq: idLoja } } } }
    ]
  }

  return query
}

export const queryProduto = (queries: any, paths: any, precoMin: number, precoMax: number, buscarNome: any, buscarModelo: any) => {
  const query: any = {
    $and: [
      { nome: { $regex: `${buscarNome}`, $options: 'i' } },
      { modelo: { $regex: `${buscarModelo}`, $options: 'i' } },
      { lojas: { $elemMatch: { preco: { $gte: precoMin } } } },
      { lojas: { $elemMatch: { preco: { $lte: precoMax } } } }
    ]
  }

  for (const path of paths) {
    if (queries[`${path.keys}`]) {
      // eslint-disable-next-line no-constant-condition
      if (path.types === 'String' || 'Boolean') {
        const filter = JSON.parse(`{ "${path.keys}": { "$in": [] } }`)
        filter[`${path.keys}`].$in = queries[`${path.keys}`]
        query.$and.push(filter)
      }
    }
  }

  return query
}
