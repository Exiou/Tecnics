const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path');
const helmet = require('helmet')

const routes = require('./routes')

const app = express()

mongoose.connect('mongodb+srv://tccetec:tccetec@cluster0-rmowr.gcp.mongodb.net/produtos?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

app.use(helmet({
    hidePoweredBy: {
        setTo: 'PHP/7.1.7'
    }
}))
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/arquivos', express.static(path.join(__dirname, '..','uploads')));
app.use(routes)


app.listen(3333)