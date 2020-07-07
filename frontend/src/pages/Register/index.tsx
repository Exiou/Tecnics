import React, { FormEvent, useState, FocusEvent } from 'react';
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

import tecnicsLogo from '../../assets/tecnics-logo.png'
import userIcon from '../../assets/svgs/user.svg'
import mailIcon from '../../assets/svgs/mail.svg'
import passwordIcon from '../../assets/svgs/password.svg'

function Register() {

    const history = useHistory()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [toggleShowPassword, setToggleShowPassword] = useState('password')

    function handleInput(event: FocusEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setFormData({ ...formData, [name]: value})
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const { name, email, password } = formData

        const response = await api.post('/users', {
            'nome': name,
            'email': email,
            'senha': password
        })

        if(response.data === 'Email já cadastrado') return alert('Email já cadastrado!')

        history.push('/')
    }

    return (
        <div className="Register">
            <div id="main">
                <img src={tecnicsLogo} alt="Tecnics Logo"/>

                <section>
                    <form onSubmit={handleSubmit}>
                        <h1>Insira seus dados</h1>

                        <div id="field-group">

                            <div className="input-field">
                                <span>
                                    <img src={userIcon} alt=""/>
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Nome"
                                    onBlur={handleInput}
                                    required
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
                                    placeholder="Email"
                                    onBlur={handleInput}
                                    required
                                />
                            </div>

                            <div className="input-field">
                                <span>
                                    <img src={passwordIcon} alt=""/>
                                </span>
                                <input
                                    type={toggleShowPassword}
                                    name="password"
                                    id="password"
                                    placeholder="Senha"
                                    onBlur={handleInput}
                                    required
                                    minLength={6}
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
                            <h2>Cadastrar</h2>
                        </button>
                    </form>

                    <Link to="./login" >Já possui uma conta?</Link>
                    <br/>
                    <Link to="/" >Voltar para a página inicial</Link>
                </section>
            </div>
        </div>
    );
}

export default Register;