import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link, useParams } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'

import api from '../../services/api'

import Header from '../../components/Header'

import plusIcon from '../../assets/svgs/plus.svg'
import searchIcon from '../../assets/svgs/search.svg'
import rightArrowIcon from '../../assets/svgs/right_arrow.svg'
import leftArrowIcon from '../../assets/svgs/left_arrow.svg'
import editIcon from '../../assets/svgs/edit.svg'
import deleteIcon from '../../assets/svgs/delete.svg'

import './styles.css'

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

interface Pagination {
    totalDocs?: number
    limit?: number
    totalPages?: number
    page?: number
    pagingCounter?: number
    hasPrevPage?: boolean
    hasNextPage?: boolean
    prevPage?: number
    nextPage?: number
}

function Management() {

    const { product } = useParams()

    const [products, setProducts] = useState<Products[]>([])
    const [pagination, setPagination] = useState<Pagination>({})
    const [selectedFilters, setSelectedFilters] = useState<any>({})

    useEffect(() => {
        api.get(`/lojas/${product}`, {
          params: {
            ...selectedFilters,
            limit: pagination.limit,
            page: pagination.page
          },
          headers: {
            idloja: '5e4c3a618241ac59f5892829'
          }
        }).then(response => {
          const { docs, ...pagination} = response.data.produtos
          
          setProducts(docs)
          setPagination(pagination)
        })
      }, [product, pagination.limit, pagination.page, selectedFilters])


    function handleOptions(event: ChangeEvent<HTMLInputElement|HTMLSelectElement>) {
        if(event.target.name === 'limit') {
            setPagination({
                ...pagination,
                limit: +event.target.value
            })
        }else {
            setSelectedFilters({
                ...selectedFilters,
                [event.target.name]: event.target.value
            })
        }
        console.log(selectedFilters)

    }

    function handleDelete(id: string) {
        try {
            api.delete(`/lojas/${product}/${id}`, {
                headers: {
                    idloja: '5e4c3a618241ac59f5892829'
                }
            })

            setProducts(products.filter(product => product._id !== id))
        }catch(err){
            alert('Erro ao deletar produto. Tente novamente!')
        }

    }

    const formatter = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL'
      })

    return (
        <div className="Management">

            <Header product={product} />

            <div id="page-management-products" >

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
                            <label>Itens por página: </label>
                            <select name="limit" id="limit-select" defaultValue="24" onChange={handleOptions}>
                                <option value="12">12</option>
                                <option value="24">24</option>
                                <option value="36">36</option>
                                <option value="48">48</option>
                            </select>
                        </div>
                        <div>
                            <label>Ordenar por:</label>
                            <select name="ordenar" id="sort-select" defaultValue="" onChange={handleOptions}>
                                <option value="">---</option>
                                <option value="lojas.preco">Preço crescente</option>
                                <option value="-lojas.preco">Preço decrescente</option>
                            </select>
                        </div>
                    </div>
                    <div id="add-product">
                        <Link to="">
                            Adicionar produto
                            <img src={plusIcon} alt="Mais"/>
                        </Link>
                    </div>
                </section>

                <main>
                    <table role="presentation">
                        <thead>
                            <tr className="table-head">
                                <th></th>
                                <th>Fabricante</th>
                                <th>Nome</th>
                                <th>Modelo</th>
                                <th>Preço</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr className="card" key={product.modelo}>
                                    <td>
                                        <img className="product-image" src={product.imagem_url} alt={product.imagem}/>
                                    </td>
                                    <td className="fabricante">
                                        <h2>{product.fabricante}</h2>
                                    </td>
                                    <td className="nome">
                                        <h2>{product.nome}</h2>
                                    </td>
                                    <td className="modelo">
                                        <h2>{product.modelo}</h2>
                                    </td>
                                    <td className="preco">
                                        <h2>{formatter.format(product.lojas[0].preco)}</h2>
                                    </td>
                                    <td className="actions">
                                        <button id="editar">
                                            <img src={editIcon} alt="Planilha"/>
                                            Editar
                                        </button>
                                        <button id="excluir" onClick={() => handleDelete(product._id)}>
                                            <img src={deleteIcon} alt="Lixeira"/>
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </main>

                <div id="pagination">
                    <button disabled={pagination.page === 1} onClick={() => {
                        setPagination({...pagination, page: pagination.page! - 1})
                    }}>
                        <img src={leftArrowIcon} alt=""/>
                        <span>Anterior</span>
                    </button>

                    <button disabled={pagination.page === pagination.totalPages} onClick={() => {
                        setPagination({...pagination, page: pagination.page! + 1})
                    }}>
                        <span>Próxima</span>
                        <img src={rightArrowIcon} alt=""/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Management;