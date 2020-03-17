//importar dependências
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path');
const helmet = require('helmet')

//importar arquivos
const routes = require('./routes')

//"inicializar"/"instanciar" o express na variável app
const app = express()

//conectar ao banco de dados no mongodb
mongoose.connect('mongodb+srv://tccetec:tccetec@cluster0-rmowr.gcp.mongodb.net/produtos?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

//helmet pra configurar alguns headers
app.use(helmet({
    hidePoweredBy: {
        setTo: 'PHP/7.1.7'
    }
}))

//"use" configurações, opções e arquivos
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/arquivos', express.static(path.join(__dirname, '..','uploads')));
app.use(routes)

//ligar o servidor na porta 3333 local
app.listen(3333)