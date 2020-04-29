const User = require('../models/User')

module.exports = {
  async show(req, res){
    try{

      const { userid } = req.headers

      const user = await User.find({ _id: userid }).populate('favoritos.modelo', 'nome imagem fabricante')

      return res.json(user)
    }catch(err){
      return res.send('Ocorreu um erro ' + err)
    }
  },

  async store(req, res){
    try {

      const {
        nome,
        email,
        senha
      } = req.body

      const imagem = req.file.filename

      const verificaUser = await User.findOne({email})

      if (verificaUser) {
        return res.json('Email já cadastrado')
      }

      const createUser = await User.create({
        nome,
        imagem,
        email,
        senha
      })

      return res.json(createUser)
      
    } catch (err) {
      return res.send('Ocorreu um erro na requisição' + err)
    }
  },

  async update(req,res){
    try {
      
      const { userid } = req.headers
      const { idProduto } = req.params
      const { tipoProduto } = req.query

      let updateUser = await User.findOneAndUpdate({ _id: userid, 'favoritos.modelo': { $ne: idProduto }}, {
        $push: {
          favoritos: {
            $each: [{
              modelo: idProduto,
              Model: tipoProduto
            }]
          }
        }
      }, { new: true })
      
      if (updateUser === null) {
        updateUser = await User.findOneAndUpdate({ _id: userid }, {
          $pull: {
            favoritos: {
                modelo: idProduto,
                Model: tipoProduto
            }
          }
        }, { new: true })
      }
      
      return res.json(updateUser)

    } catch (err) {
      return res.send('Ocorreu um erro durante a requisição: ' + err)
    }
  }
}