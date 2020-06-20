import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link, useParams } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'
import api from '../../services/api'

import Header from '../../components/Header'

import './styles.css'

import plusIcon from '../../assets/svgs/plus.svg'
import heartIcon from '../../assets/svgs/heart.svg'
import searchIcon from '../../assets/svgs/search.svg'
import emptyGridIcon from '../../assets/svgs/empty_grid.svg'
import fillGridIcon from '../../assets/svgs/fill_grid.svg'
import emptyListIcon from '../../assets/svgs/empty_list.svg'
import fillListIcon from '../../assets/svgs/fill_list.svg'

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
  const [selectedFilters, setSelectedFilters] = useState<any>({precoMin: '0', precoMax: '5000'})
  const [cardStyle, setCardStyle] = useState<string>('card list')

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

  function handleOptions(event: ChangeEvent<HTMLInputElement|HTMLSelectElement>) {
    setSelectedFilters({
      ...selectedFilters,
      [event.target.name]: event.target.value
    })
  }

  function handlePrice(event: ChangeEvent<HTMLInputElement>) {

    if(event.target.value === ""){
      delete selectedFilters[event.target.name]
    }else {
      setSelectedFilters({
        ...selectedFilters,
        [event.target.name]: event.target.value
      })
    }
  }

  function handleCardStyle(className: string) {
    if(className === 'gridButton'){
      setCardStyle('card grid')
    }else {
      setCardStyle('card list')
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
    },
    formatValue(value: string) {
      switch (value) {
        case 'true':
          return 'Sim';
        case 'false':
          return 'Não';      
        default:
          return value;
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
                  <DebounceInput
                    className="range-min-price"
                    type="range"
                    name="precoMin"
                    id="min-price"
                    min="0"
                    max="5000"
                    value={selectedFilters.precoMin}
                    onChange={handlePrice}
                    debounceTimeout={300}
                  />
                  <DebounceInput
                    className="range-max-price"
                    type="range"
                    name="precoMax"
                    id="max-price"
                    min="0"
                    max="5000"
                    value={selectedFilters.precoMax}
                    onChange={handlePrice}
                    debounceTimeout={300}
                  />
                </div>
                <div className="text">
                  <DebounceInput
                    className="text-input text-min-price"
                    inputMode="numeric"
                    placeholder="Mínimo"
                    type="number"
                    name="precoMin"
                    id="min-price"
                    value={selectedFilters.precoMin}
                    onChange={handlePrice}
                    debounceTimeout={300}
                  />
                  <DebounceInput
                    className="text-input text-max-price"
                    inputMode="numeric"
                    placeholder="Máximo"
                    type="number"
                    name="precoMax"
                    id="max-price"
                    value={selectedFilters.precoMax}
                    onChange={handlePrice}
                    debounceTimeout={300}
                  />
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
                      <span>{formatFilter.formatValue(String(value))}</span>
                    </div>
                  ))}</div>
                </fieldset>
              ))
            }
      
        </aside>

        <div id="main">
          <section id="options">
            <div id="search">
              <span><img src={searchIcon} alt="Lupa" id="search-icon" /></span>
              <DebounceInput
                type="text"
                name="buscarNome"
                id="search-input"
                placeholder="Pesquisar por nome"
                onChange={handleOptions}
                debounceTimeout={300}
              />
            </div>
            <div id="limit-sort">
              <div>
                <label htmlFor="">Itens por página: </label>
                <select name="limit" id="limit-select" defaultValue="24" onChange={handleOptions}>
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="36">36</option>
                  <option value="48">48</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Ordenar por:</label>
                <select name="ordenar" id="sort-select" defaultValue="" onChange={handleOptions}>
                  <option value="">---</option>
                  <option value="lojas.preco">Preço crescente</option>
                  <option value="-lojas.preco">Preço decrescente</option>
                </select>
              </div>
            </div>
            <div id="card-styles">
              <button onClick={() => handleCardStyle('gridButton')} >
                <img
                  src={ cardStyle === 'card grid' ? fillGridIcon : emptyGridIcon }
                  alt="Grid Icon"
                />
              </button>
              <button onClick={() => handleCardStyle('listButton')} >
                <img
                  src={ cardStyle === 'card list' ? fillListIcon : emptyListIcon }
                  alt="List Icon"
                />
              </button>
            </div>
          </section>

          <main>
            {products.map(product => (
              <div className={cardStyle} key={product.modelo}>
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
    </div>
  );
}

export default Product;