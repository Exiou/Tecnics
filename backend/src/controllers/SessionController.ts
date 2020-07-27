import { Request, Response, Router } from 'express'

import User from '../models/User'

class SessionController {
  public path = '/sessions'
  public routes = Router()

  constructor () {
    this.initializeRoutes()
  }

  public initializeRoutes () {
    this.routes.post(`${this.path}`, this.store)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    try {
      const { name, password } = req.body

      const user = await User.findOne({
        nome: name,
        senha: password
      })

      if (!user) {
        return res.json({ error: 'No user found with these credentials' })
      }

      return res.json(user)
    } catch (err) {
      return res.send(`Ocorreu um erro na requisição: ${err}`)
    }
  }
}

export default new SessionController()
