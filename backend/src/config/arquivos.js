const fs = require('fs')


    fs.readFile("./src/uploads/exemplo.json" , 'utf-8' , (err, data) => {
        if(err){
            console.log(`Erro: ${err}`)
        }else{
            console.log('deu certo')
            var jsonData = JSON.parse(data)
            console.log(jsonData.computador1)
        }
    })