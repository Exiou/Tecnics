import React, { useEffect, useState, ChangeEvent } from 'react';
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

function Product() {

  let { product } = useParams()

  const [products, setProducts] = useState<Products[]>([])  
  const [filters, setFilters] = useState<any>({})
  const [selectedFilters, setSelectedFilters] = useState<any>({})

  useEffect(() => {
    api.get(`/produtos/${product}`).then(response => {
      console.log(response.data)
      setProducts(response.data.produtos.docs)
      setFilters(response.data.filters)
    })
  }, [product])

  let formatter = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })

  useEffect(() => {
    console.log(selectedFilters)
    api.get(`/produtos/${product}`, {
      params: selectedFilters
    }).then(response => {
      setProducts(response.data.produtos.docs)
    })
  }, [product, selectedFilters])

  function handleSelectFilter(event: ChangeEvent<HTMLInputElement>, key: any) {    
    if (selectedFilters[key] === undefined || selectedFilters[key] === ''){
      setSelectedFilters({
        ...selectedFilters,
        [key]: [event.target.name]
      })
    }else{
      if(selectedFilters[key].includes(event.target.name)){
        setSelectedFilters({
          ...selectedFilters,
          [key]: selectedFilters[key].filter((val: any)=> val !== event.target.name)
        })
      }else {
        setSelectedFilters({
          ...selectedFilters,
          [key]: [...selectedFilters[key], event.target.name]
        })
      }
    }
  }

  const formatFilter = {
    formatLabel(key: string): string {
      switch (key) {
        case 'familia':
          return 'Família';
        case 'serie':
          return 'Série';
        case 'graficos_integrados':
          return 'Gráficos integrados';
        case 'nucleo':
          return 'Núcleo';
        case 'frequencia':
          return 'Frequência';
        case 'frequencia_turbo':
          return 'Frequência turbo';
        case 'virtualizacao':
          return 'Virtualização';
        case 'tipo_memoria':
          return 'Tipo da memória';
        case 'tamanho_memoria':
          return 'Tamanho da memória';
        case 'ram_max':
          return 'RAM Máxima';
        case 'modulo':
          return 'Módulo';
        case 'formato_placa_mae':
          return 'Formato da placa mãe';
        case 'potencia_fonte':
          return 'Potência da fonte';
        case 'filtro_removivel':
          return 'Filtro removível';
        case 'saida':
          return 'Saída';
        case 'potencia':
          return 'Potência';
        case 'eficiencia':
          return 'Eficiência';
        case 'hibrido':
          return 'Híbrido';
        default:
          return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
      }
    }
  }
  
  return (
    <div className="Product">

      <Header product={product} />

      <div id="page-list-products">

        <aside id="filters">
          
            <h2>Filtros</h2>

            <fieldset>
              <label>Preço - R$</label>
              <div className="price-values">
                <div className="range">
                  <input className="range-min-price" type="range" name="min-price" id="min-price" defaultValue="0" />
                  <input className="range-max-price" type="range" name="max-price" id="max-price" defaultValue="100" />
                </div>
                <div className="text">
                  <input className="text-input text-min-price" inputMode="numeric" placeholder="Mínimo" type="number" name="min-price" id="min-price"/>
                  <input className="text-input text-max-price" inputMode="numeric" placeholder="Máximo" type="number" name="max-price" id="max-price"/>
                </div>
              </div>
            </fieldset>

            {
              Object.keys(filters).map(key => (
                <fieldset key={key}>
                  <label>{formatFilter.formatLabel(key)}</label>
                  <div className="values">{filters[key].map((value: any) => (
                    <div key={value} className="checkbox">
                      <input type="checkbox" onChange={(e) => handleSelectFilter(e, key)} name={String(value)} id={String(value)} />
                      <span>{String(value)}</span>
                    </div>
                  ))}</div>
                </fieldset>
              ))
            }
      
        </aside>

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

        
      
    </div>
  );
}

export default Product;
