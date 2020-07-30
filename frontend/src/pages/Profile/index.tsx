/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, ChangeEvent, FormEvent, FocusEvent } from 'react'
import { Link } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

import tecnicsLogo from '../../assets/tecnics-logo.png'
import userIcon from '../../assets/svgs/user.svg'
import mailIcon from '../../assets/svgs/mail.svg'
import passwordIcon from '../../assets/svgs/password.svg'
import editProfileIcon from '../../assets/svgs/edit_profile.svg'
import plusIcon from '../../assets/svgs/plus.svg'
import filledHeartIcon from '../../assets/svgs/filled_heart.svg'

interface Favoritos {
  _id: string
  produto: Products
  modelo: string
}
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

function Profile () {
  const userId = window.localStorage.getItem('userId')

  const [formData, setFormData] = useState({
    nome: '',
    imagem: '',
    email: '',
    senha: '',
    favoritos: [],
    imagem_url: ''
  })
  const [toggleShowPassword, setToggleShowPassword] = useState('password')
  const [selectedFile, setSelectedFile] = useState<File>()
  const [favoritos, setFavoritos] = useState<Favoritos[]>([])

  useEffect(() => {
    api.get(`/users/${userId}`).then(response => {
      setFormData(response.data)
      setFavoritos(response.data.favoritos)
    })
  }, [userId])

  function handleInput (event: FocusEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setFormData({ ...formData, [name]: value })
  }

  async function handleSubmit (event: FormEvent) {
    event.preventDefault()

    const { nome, email, senha } = formData

    const data = new window.FormData()

    data.append('nome', nome)
    data.append('email', email)
    data.append('senha', senha)
    data.append('file', selectedFile!)

    await api.put(`/users/${userId}`, data)

    window.alert('Seu perfil foi atualizado!')
  }

  function handleImage (event: ChangeEvent<HTMLInputElement>) {
    const imageUrl = URL.createObjectURL(event.target.files![0])
    const image = event.target.files![0]

    setFormData({ ...formData, imagem_url: imageUrl })
    setSelectedFile(image)
  }

  async function handleFavorites (id: string) {
    await api.delete(`/favoritos/${id}`, {
      headers: {
        userid: userId
      }
    })
    setFavoritos(favoritos.filter(product => product.produto._id !== id))
  }

  const formatter = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })

  return (
    <div className="Profile">
      <div id="main">

        <div id="left-side">
          <img id="tecnics-logo" src={tecnicsLogo} alt="Tecnics Logo"/>

          <h1>Favoritos</h1>
          <div id="favorites">
            <div>
              {
                favoritos.length > 0
                  ? favoritos.map(productData => {
                    let modelo = ''
                    switch (productData.modelo) {
                      case 'Processador':
                        modelo = 'processadores'
                        break
                      case 'PlacaVideo':
                        modelo = 'placas-video'
                        break
                      case 'PlacaMae':
                        modelo = 'placas-mae'
                        break
                      case 'Memoria':
                        modelo = 'memorias'
                        break
                      case 'Gabinete':
                        modelo = 'gabinetes'
                        break
                      case 'Fonte':
                        modelo = 'fontes'
                        break
                      case 'Cooler':
                        modelo = 'coolers'
                        break
                      case 'Armazenamento':
                        modelo = 'armazenamentos'
                        break
                      default:
                        break
                    }
                    return (
                      <div className='card' key={productData.produto.modelo}>
                        <img className="product-image" src={productData.produto.imagem_url} alt={productData.produto.imagem}/>

                        <div className="props">
                          <h2>{productData.produto.fabricante}</h2>
                          <h2>{productData.produto.nome}</h2>
                          <h3>{formatter.format(productData.produto.lojas[0].preco)}</h3>
                        </div>

                        <Link to={`../produtos/${modelo}/${productData.produto._id}`} >
                          <label>Detalhes</label>
                          <img className="plus-icon" src={plusIcon} alt="Plus Icon"/>
                        </Link>

                        <button onClick={() => handleFavorites(productData.produto._id)}>
                          <img
                            className="heart-icon"
                            src={filledHeartIcon}
                            alt="Heart Icon"
                          />
                        </button>

                      </div>
                    )
                  })
                  : <p>
                  Dê um "coração"
                    <br/>
                  nos seus produtos favoritos e
                    <br/>
                  eles aparecerão aqui!
                  </p>
              }
            </div>
          </div>
        </div>
        <section>
          <form onSubmit={handleSubmit}>

            <div id="form-head">
              <h1>{formData.nome}</h1>

              <div id="image-container">
                <img id="user-img" src={formData.imagem_url} alt={formData.imagem} />
                <input
                  type="file"
                  id="file"
                  onChange={handleImage}
                />
                <label htmlFor="file">Enviar imagem</label>
              </div>
            </div>

            <div id="field-group">

              <div className="input-field">
                <span>
                  <img src={userIcon} alt=""/>
                </span>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  defaultValue={formData.nome}
                  onBlur={handleInput}
                />
              </div>

              <div className="input-field">
                <span>
                  <img src={mailIcon} alt=""/>
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={formData.email}
                  onBlur={handleInput}
                />
              </div>

              <div className="input-field">
                <span>
                  <img src={passwordIcon} alt=""/>
                </span>
                <input
                  type={toggleShowPassword}
                  name="senha"
                  id="senha"
                  defaultValue={formData.senha}
                  onBlur={handleInput}
                />
                <button type="button" onClick={() => {
                  if (toggleShowPassword === 'password') {
                    setToggleShowPassword('text')
                  } else if (toggleShowPassword === 'text') {
                    setToggleShowPassword('password')
                  }
                }}>
                  <label>{toggleShowPassword === 'password' ? 'Mostrar' : 'Esconder'}</label>
                </button>
              </div>

            </div>

            <button type="submit" id="submit">
              <img src={editProfileIcon} alt="Ícone editar"/>
              <h2>Editar</h2>
            </button>
          </form>

          <Link to="/" >Voltar para a página inicial</Link>
        </section>
      </div>
    </div>
  )
}

export default Profile
