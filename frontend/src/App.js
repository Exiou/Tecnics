import React, { Component } from 'react';
import Routes from './routes'

import api from './services/api'

import './styles.css'

import Header from './components/Header'
import Main from './pages/main'

const App = () => (
    <div className="App">
        <Routes />
    </div>
)

export default App