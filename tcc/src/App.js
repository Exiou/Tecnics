import React, { Component } from 'react';
import './App.css'

class MyButton extends Component {
    render() {
        return (
        <button 
            onClick = {() => { this.props.handleClick(this.props.label) }}
        >
            {this.props.label}
        </button>)
    }
}

class MyLabel extends Component {
    render() {
        return <p>{this.props.text}</p>
    }
}

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
                    <MyLabel text={this.state.labelText} />
                    <MyLabel text="php o caraio" />
                    <MyLabel text="yikesss" />
                    <h1>Título</h1>
                </header>
                <section>
                    <div>
                        Testando...
                        <MyButton handleClick={this.setLabelText} label="btn 1" />
                        <MyButton handleClick={this.setLabelText} label="btn 2" />
                        <MyButton handleClick={this.setLabelText} label="btn 3" />
                    </div>
                    <div>

                    </div>
                </section>
                <footer>
                    <p>yaay</p>
                </footer>
            </>
        );
    }
}

export default App