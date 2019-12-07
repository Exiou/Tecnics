import React, { Component } from 'react';
import './App.css'

import api from './services/api'

class App extends Component {

    
    constructor(props) {
        super(props)

        this.state = {
            labelText: '',
        }

        this.setLabelText = this.setLabelText.bind(this)
    }

    setLabelText(labelText){
        this.setState({ labelText })
    }



    render() {
        return (
            <>
                <header>
                    
                </header>
                <section>
                    <div>
                        
                    </div>

                    <div>

                    </div>
                </section>
                <footer>
                    
                </footer>
            </>
        );
    }
}

export default App