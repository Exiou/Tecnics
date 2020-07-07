import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'

import api from '../../services/api'

import Header from '../../components/Header'

import './styles.css'

import externalLinkIcon from '../../assets/svgs/external_link.svg'

interface Lojas {
    idLoja: {
        id: string
        nome: string
        imagem: string
        urlSite: string
        imagem_url: string

    }
    preco: number
    urlProduto: string
}

function Detail() {

    const { product, productId } = useParams()

    const [lojas, setLojas] = useState<Lojas[]>([])
    const [productSpecs, setProductSpecs] = useState<any>('')

    useEffect(() => {
        api.get(`/produtos/${product}/${productId}`)
        .then(response => {
            const { lojas, ...specs } = response.data

            setLojas(lojas)
            setProductSpecs(specs)
        })
    }, [product, productId])

    let formatter = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL'
    })

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
        <div className="Detail">
            <Header product={product} />

            <main>
                <div id="product">
                    <div id="product-main-specs">
                        <img src={productSpecs.imagem_url} alt={productSpecs.imagem} />

                        <h2>{productSpecs.fabricante}</h2>
                        <h2>{productSpecs.nome}</h2>
                    </div>
                    <div id="lojas">
                        <div id="loja-head">
                            <h3>Loja</h3>
                            <h3 style={{marginLeft:'140px'}}>Preço</h3>
                        </div>
                        {
                            lojas.map(loja => (
                                <div id="loja" key={loja.idLoja.id}>
                                    <a id="logo-loja" href={loja.idLoja.urlSite}>
                                        <img src={loja.idLoja.imagem_url} alt={loja.idLoja.imagem} />
                                    </a>

                                    <h2>{formatter.format(loja.preco)}</h2>
                                    <a id="button-external-link" href={loja.urlProduto}>
                                        <span>Ver na loja</span>
                                        <img src={externalLinkIcon} alt=">"/>
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div id="product-specs">
                    <h1>Especificações</h1>
                    <table>
                        <tbody>
                            {
                                Object.entries(productSpecs)
                                .filter(
                                    ([key, value]: [string, any]) =>
                                    key !== '_id' && key !== 'imagem' && key !== 'imagem_url' && key !== 'id' && key !== '__v'
                                )
                                .map(([key, value]: [string, any]) => (
                                    <tr key={key}>
                                        <th>
                                            <span>{formatFilter.formatLabel(key)}:</span>
                                        </th>
                                        <td>
                                            <span>{formatFilter.formatValue(String(value))}</span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default Detail;