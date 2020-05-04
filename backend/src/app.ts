import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import helmet from 'helmet'

import routes from './routes'

class App {
    public app: express.Application

    public constructor() {
        this.app = express()

        this.middlewares()
        this.database()
        this.routes()
    }

    private middlewares(): void {
        this.app.use(helmet({
            hidePoweredBy: {
                setTo: 'PHP/7.1.7'
            }
        }))

        
        this.app.use(cors())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json())
        this.app.use('/arquivos', express.static(path.join(__dirname, '..', 'uploads')))
    }

    private database(): void {
        mongoose.connect(`${process.env.MONGOOSE_CONNECTION}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
    }

    private routes(): void {
        this.app.use(routes)
        routes.forEach((controller) => {
            this.app.use(controller)
        })
    }

}

export default new App().app