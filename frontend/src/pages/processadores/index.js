import React, { Component } from 'react'
import api from '../../services/api'

import './styles.css'

export default class Processadores extends Component{
    state = {
        processadores: {}
    }

    async componentDidMount(){
        const { id } = this.props.match.params

        const response = await api.get(`/processadores/${id}`)

        this.setState({ processadores: response.data })
    }

    render() {
        const { processadores } = this.state

        return (
            <div className="processador-info">
                <h1>{processadores.modelo}</h1>
                <p>Preço: {processadores.preco}</p>

                <p>
                    <a href={processadores.imagem_url}>
                        <img src={processadores.imagem_url} alt={processadores.imagem}/>
                    </a>
                </p>
            </div>
        )
    }
}