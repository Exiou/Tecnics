import React, { FormEvent, useState, FocusEvent } from 'react';
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

import tecnicsLogo from '../../assets/tecnics-logo.png'
import userIcon from '../../assets/svgs/user.svg'
import passwordIcon from '../../assets/svgs/password.svg'

function Login() {

    const history = useHistory()

    const [formData, setFormData] = useState({
        name: '',
        password: '',
    })
    const [toggleShowPassword, setToggleShowPassword] = useState('password')

    function handleInput(event: FocusEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setFormData({ ...formData, [name]: value})
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const response = await api.post('/sessions', formData)

        localStorage.setItem('userId', response.data._id)

        history.push('/')
    }

    return (
        <div className="Login">
            <div id="main">
                <img src={tecnicsLogo} alt="Tecnics Logo"/>

                <section>
                    <form onSubmit={handleSubmit}>
                        <h1>Preencha os campos</h1>

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
                            <h2>Entrar</h2>
                        </button>
                    </form>

                    <Link to="./login" >Esqueceu sua senha?</Link>
                    <br />
                    <Link to="./register" >Não possui uma conta?</Link>
                    <br/>
                    <Link to="/" >Voltar para a página inicial</Link>
                </section>
            </div>
        </div>
    );
}

export default Login;