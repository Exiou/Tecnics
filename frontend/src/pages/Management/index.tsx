import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'
import Dropzone from '../../components/Dropzone'

import api from '../../services/api'

import Header from '../../components/Header'

import plusIcon from '../../assets/svgs/plus.svg'
import searchIcon from '../../assets/svgs/search.svg'
import rightArrowIcon from '../../assets/svgs/right_arrow.svg'
import leftArrowIcon from '../../assets/svgs/left_arrow.svg'
import editIcon from '../../assets/svgs/edit.svg'
import deleteIcon from '../../assets/svgs/delete.svg'
import uploadIcon from '../../assets/svgs/upload.svg'
import closeIcon from '../../assets/svgs/close.svg'

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

function Management () {
  const { product } = useParams()

  const idloja = window.localStorage.getItem('idloja')

  const [products, setProducts] = useState<Products[]>([])
  const [pagination, setPagination] = useState<Pagination>({})
  const [selectedFilters, setSelectedFilters] = useState<any>({})
  const [editedPrice, setEditedPrice] = useState<number>(0)
  const [selectedImages, setSelectedImages] = useState<File[]>()
  const [productJson, setProductJson] = useState<string>()
  const [toggleModal, setToggleModal] = useState<string>('hide')

  useEffect(() => {
    api.get(`/lojas/${product}`, {
      params: {
        ...selectedFilters,
        limit: pagination.limit,
        page: pagination.page
      },
      headers: {
        idloja
      }
    }).then(response => {
      const { docs, ...pagination } = response.data.produtos

      setProducts(docs)
      setPagination(pagination)
    })
  }, [product, pagination.limit, pagination.page, selectedFilters, idloja])

  function handleOptions (event: ChangeEvent<HTMLInputElement|HTMLSelectElement>) {
    if (event.target.name === 'limit') {
      setPagination({
        ...pagination,
        limit: +event.target.value
      })
    } else {
      setSelectedFilters({
        ...selectedFilters,
        [event.target.name]: event.target.value
      })
    }
    console.log(selectedFilters)
  }

  async function handleDelete (id: string) {
    try {
      await api.delete(`/lojas/${product}/${id}`, {
        headers: {
          idloja
        }
      })

      setProducts(products.filter(product => product._id !== id))
    } catch (err) {
      window.alert('Erro ao deletar produto. Tente novamente!')
    }
  }

  async function handleEdit (id: string) {
    try {
      await api.put(`/lojas/${product}/${id}`, {
        preco: editedPrice
      }, {
        headers: {
          idloja
        }
      })

      window.alert('O produto foi atualizado com sucesso!')
    } catch (err) {
      window.alert('Erro ao editar produto. Tente novamente!')
    }
  }

  async function handleAddProduct (event: FormEvent) {
    event.preventDefault()

    if (productJson && selectedImages) {
      const data = new window.FormData()

      selectedImages.map(image => data.append('files', image))
      data.append('produto', productJson)

      await api.post(`/lojas/${product}`, data,
        {
          headers: {
            idloja: '5e4c3a618241ac59f5892829'
          }
        })

      window.alert('Produtos cadastrados com sucesso! Recarregue a página e eles aparecerão aqui!')
      setToggleModal('hide')
    }
  }

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
            <button onClick={() => setToggleModal('')}>
                            Adicionar produtos
              <img src={plusIcon} alt="Mais"/>
            </button>
          </div>
        </section>

        <div id="results">
          <label>Resultados: <span>{pagination.totalDocs}</span></label>
        </div>

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
                    <input
                      type="text"
                      name="nome"
                      id="nome"
                      defaultValue={product.lojas[0].preco}
                      onBlur={(e) => setEditedPrice(+e.target.value)}
                    />
                  </td>
                  <td className="actions">
                    <button id="editar" onClick={() => handleEdit(product._id)} >
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
            setPagination({ ...pagination, page: pagination.page! - 1 })
          }}>
            <img src={leftArrowIcon} alt=""/>
            <span>Anterior</span>
          </button>

          <button disabled={pagination.page === pagination.totalPages} onClick={() => {
            setPagination({ ...pagination, page: pagination.page! + 1 })
          }}>
            <span>Próxima</span>
            <img src={rightArrowIcon} alt=""/>
          </button>
        </div>

        <div id="modal" className={toggleModal}>
          <form onSubmit={handleAddProduct}>
            <button type="button" id="hide-button" onClick={() => setToggleModal('hide')}>
              <img src={closeIcon} alt="X"/>
            </button>
            <Dropzone onFileUploaded={setSelectedImages} />
            <textarea
              placeholder="Coloque as informações dos produtos aqui!"
              name="produtos"
              id="produtos"
              onBlur={(e) => setProductJson(e.target.value)}
            />
            <button id="submit" type="submit">
                            Enviar
              <img src={uploadIcon} alt="^"/>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Management
