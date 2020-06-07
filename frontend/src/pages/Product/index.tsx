import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import api from '../../services/api'

import Header from '../../components/Header'

import './styles.css'

import plusIcon from '../../assets/svgs/plus.svg'
import heartIcon from '../../assets/svgs/heart.svg'

interface Products {
  _id: string
  nome: string
  fabricante: string
  modelo: string
  imagem: string
  imagem_url: string
  lojas: {
    id: string
    idLoja: string
    preco: number
    urlProduto: string
  }[]
}

function App() {

  let { product } = useParams()

  const [products, setProducts] = useState<Products[]>([])  

  useEffect(() => {
    api.get(`/produtos/${product}`).then(response => {
      console.log(response.data.produtos.docs)
      setProducts(response.data.produtos.docs)
    })
  }, [product])

  let formatter = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })
  
  return (
    <div className="App">

      <Header product={product} />

      <main>
        {products.map(product => (
          <div className="card" key={product.modelo}>
            <img className="product-image" src={product.imagem_url} alt={product.imagem}/>

            <div className="props">
              <h2>{product.fabricante}</h2>
              <h2>{product.nome}</h2>
              <h3>{formatter.format(product.lojas[0].preco)}</h3>
            </div>

            <Link to={`/${product._id}`} >
              <p>Detalhes</p>
              <img className="plus-icon" src={plusIcon} alt="Plus Icon"/>
            </Link>

            <button>
              <img className="heart-icon" src={heartIcon} alt="Heart Icon"/>
            </button>
            
          </div>
        ))}
      </main>
      
    </div>
  );
}

export default App;
