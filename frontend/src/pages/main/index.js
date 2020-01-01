import React, { Component } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'

import './styles.css'

export default class Main extends Component {
    state = {
        processadores: [],

    }

    componentDidMount() {
        this.loadProcessadores()
    }

    loadProcessadores = async () => {
        const response = await api.get('/processadores')

        this.setState({ processadores: response.data.docs })
    }

    render() {
        const { processadores } = this.state

        return(
            <div className="processador-list">
                {processadores.map(processador => (
                    <article key={processador._id}>
                        <strong>{processador.modelo}</strong>
                        <p>Preço: {processador.preco}</p>

                        <img src={processador.imagem_url} alt={processador.imagem}/>

                        <Link to={`/processadores/${processador._id}`}> + COMPRAR</Link>
                    </article>
                ))}
            </div>
        )
    }
}