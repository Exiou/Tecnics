import { Request, Response, Router } from 'express'

import User from '../models/User'

class FavoriteController {
    public path = '/favoritos'
    public routes = Router()

    constructor () {
      this.initializeRoutes()
    }

    public initializeRoutes () {
      this.routes.put(`${this.path}/:produto`, this.update)
      this.routes.delete(`${this.path}/:produto`, this.destroy)
    }

    public async update (req: Request, res: Response): Promise<Response> {
      try {
        const { userid } = req.headers
        const { produto } = req.params as any
        const { modelo } = req.query as { modelo: string}

        const addFavorite = await User.findOneAndUpdate({
          $and: [
            { _id: userid },
            { 'favoritos.produto': { $ne: produto } }
          ]
        }, {
          $push: {
            favoritos: {
              $each: [{
                produto,
                modelo
              }]
            }
          }
        }, { new: true })

        return res.json(addFavorite)
      } catch (err) {
        return res.send(`Ocorreu um erro na requisição: ${err}`)
      }
    }

    public async destroy (req: Request, res: Response): Promise<Response> {
      try {
        const { userid } = req.headers
        const { produto } = req.params as any

        const removeFavorite = await User.findByIdAndUpdate(userid, {
          $pull: {
            favoritos: {
              produto
            }
          }
        }, { new: true })

        return res.json(removeFavorite)
      } catch (err) {
        return res.send(`Ocorreu um erro na requisição: ${err}`)
      }
    }
}

export default new FavoriteController()
