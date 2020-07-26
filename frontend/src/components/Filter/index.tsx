import React, { useState, useEffect, ChangeEvent } from 'react'
import { DebounceInput } from 'react-debounce-input'

import api from '../../services/api'

import './styles.css'

interface Props{
  product: string
  prices: {
    precoMin: string
    precoMax: string
  }
  handlePrice: (event: ChangeEvent<HTMLInputElement>) => void
  handleSelectFilter: (event: ChangeEvent<HTMLInputElement>, key: any) => void
}

const Filter: React.FC<Props> = ({ product, prices, handlePrice, handleSelectFilter }: Props) => {
  const [filters, setFilters] = useState<any>({})

  useEffect(() => {
    api.get(`/produtos/${product}`).then(response => {
      setFilters(response.data.filters)
    })
  }, [product])

  const formatFilter = {
    formatLabel (key: string): string {
      switch (key) {
        case 'familia':
          return 'Família'
        case 'serie':
          return 'Série'
        case 'graficos_integrados':
          return 'Gráficos integrados'
        case 'nucleo':
          return 'Núcleo'
        case 'frequencia':
          return 'Frequência'
        case 'frequencia_turbo':
          return 'Frequência turbo'
        case 'virtualizacao':
          return 'Virtualização'
        case 'tipo_memoria':
          return 'Tipo da memória'
        case 'tamanho_memoria':
          return 'Tamanho da memória'
        case 'ram_max':
          return 'RAM Máxima'
        case 'modulo':
          return 'Módulo'
        case 'formato_placa_mae':
          return 'Formato da placa mãe'
        case 'potencia_fonte':
          return 'Potência da fonte'
        case 'filtro_removivel':
          return 'Filtro removível'
        case 'saida':
          return 'Saída'
        case 'potencia':
          return 'Potência'
        case 'eficiencia':
          return 'Eficiência'
        case 'hibrido':
          return 'Híbrido'
        default:
          return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')
      }
    },
    formatValue (value: string) {
      switch (value) {
        case 'true':
          return 'Sim'
        case 'false':
          return 'Não'
        default:
          return value
      }
    }
  }
  return (
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
              value={prices.precoMin}
              onChange={handlePrice}
              debounceTimeout={300}
            />
            <DebounceInput
              className="range-max-price"
              type="range"
              name="precoMax"
              id="max-price"
              min="0"
              max="50000"
              value={prices.precoMax}
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
              value={prices.precoMin}
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
              value={prices.precoMax}
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
  )
}

export default Filter
