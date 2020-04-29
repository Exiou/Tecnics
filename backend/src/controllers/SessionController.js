const User = require('../models/User')

module.exports = {
  async store(req,res){
    const {
      email,
      senha
    } = req.body

    let user = await User.findOne({ email, senha })

    if(!user){
      return res.send('Email ou senha incorretos. Verifique novamente ou acesse "Esqueci minha senha"')
    }
    
    return res.json(user)
  }
}