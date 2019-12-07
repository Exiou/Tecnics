const Processador = require('../models/Processador')
const fs = require('fs') // USA FS NISSO AUQI AMANHA E NOIS

module.exports = {
    async index(req, res){

        fs.readFile("./src/uploads/processadores.json" , 'utf-8' , (err, data) => {
            if(err){
                console.log(`Erro: ${err}`)
            }else{
                console.log('deu certo')
                const processadores = JSON.parse(data)

                

                return res.json(processadores)
            }
        })

    },

    async show(req, res){

        fs.readFile("./src/uploads/processadores.json" , 'utf-8' , (err, data) => {
            if(err){
                console.log(`Erro: ${err}`)
            }else{
                console.log('deu certo')
                const processadores = JSON.parse(data)

                const { modelo }  = req.params

                return res.json(processadores[`${modelo}`])
            }
        })

    }
}