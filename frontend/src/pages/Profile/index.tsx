import React, { useState, useEffect, ChangeEvent, FormEvent, FocusEvent } from 'react';
import { Link } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

import tecnicsLogo from '../../assets/tecnics-logo.png'
import userIcon from '../../assets/svgs/user.svg'
import mailIcon from '../../assets/svgs/mail.svg'
import passwordIcon from '../../assets/svgs/password.svg'
import editProfileIcon from '../../assets/svgs/edit_profile.svg'

function Profile() {

    const userId = localStorage.getItem('userId')

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

    useEffect(() => {
        api.get(`/users/${userId}`).then(response => (
            setFormData(response.data)
        ))
    }, [userId])

    function handleInput(event: FocusEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setFormData({ ...formData, [name]: value})
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const { nome, email, senha } = formData

        const data = new FormData()

        data.append('nome', nome)
        data.append('email', email)
        data.append('senha', senha)
        data.append('file', selectedFile!)

        await api.put(`/users/${userId}`, data)

        alert('Seu perfil foi atualizado!')
    }

    function handleImage(event: ChangeEvent<HTMLInputElement>) {
        
        const imageUrl = URL.createObjectURL(event.target.files![0])
        const image = event.target.files![0]

        setFormData({...formData, imagem_url: imageUrl})
        setSelectedFile(image)
        
    }

    return (
        <div className="Profile">
            <div id="main">

                <div id="left-side">
                    <img src={tecnicsLogo} alt="Tecnics Logo"/>

                    <div id="favorites">
                        <h1>Favoritos</h1>

                        <p>
                            Dê um "coração"
                            <br/>
                            nos seus produtos favoritos e
                            <br/>
                            eles aparecerão aqui!
                        </p>
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
                                    if(toggleShowPassword === 'password'){
                                        setToggleShowPassword('text')
                                    }else if(toggleShowPassword === 'text'){
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
    );
}

export default Profile;