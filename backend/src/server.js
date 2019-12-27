const express = require('express')
const mongoose = require('mongoose')
const path = require('path');

const routes = require('./routes')

const app = express()

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-basq4.mongodb.net/tcc?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/arquivos', express.static(path.join(__dirname, '..','uploads')));
app.use(routes)





app.listen(3333)