import { Request, Response, Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/multer'

import User from '../models/User'

class UserController {
  public path = '/users'
  public routes = Router()

  constructor () {
    this.initializeRoutes()
  }

  public initializeRoutes () {
    this.routes.get(`${this.path}`, this.index)
    this.routes.get(`${this.path}/:userid`, this.show)
    this.routes.post(`${this.path}`, this.store)
    this.routes.put(`${this.path}/:userid`, multer(uploadConfig('users')).single('file'), this.update)
    this.routes.delete(`${this.path}/:userid`, this.destroy)
  }

  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.find()

      return res.json(users)
    } catch (err) {
      return res.send(`Ocorreu um erro na requisição: ${err}`)
    }
  }

  public async show (req: Request, res: Response): Promise<Response> {
    try {
      const { userid } = req.params

      const user = await User.findOne({ _id: userid }).populate('favoritos.produto')

      return res.json(user)
    } catch (err) {
      return res.send(`Ocorreu um erro na requisição: ${err}`)
    }
  }

  public async store (req: Request, res: Response): Promise<Response> {
    try {
      const {
        nome,
        email,
        senha
      } = req.body

      const imagem = 'defaultUserImage.png'

      const verificaUser = await User.findOne({ email })

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
      return res.send(`Ocorreu um erro na requisição: ${err}`)
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const { userid } = req.params

    const {
      nome,
      email,
      senha
    } = req.body

    let imagem

    if (req.file) imagem = req.file.filename

    const updateUser = await User.findOneAndUpdate({ _id: userid }, {
      nome,
      imagem,
      email,
      senha
    }, {
      omitUndefined: true
    })

    return res.json(updateUser)
  }

  public async destroy (req: Request, res: Response): Promise<Response> {
    const { userid } = req.params

    const deleteUser = await User.findOne({ _id: userid })

    // eslint-disable-next-line no-unused-expressions
    deleteUser?.remove()

    return res.json(deleteUser)
  }
}

export default new UserController()
