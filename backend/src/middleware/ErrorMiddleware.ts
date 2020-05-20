import { NextFunction, Request, Response, response } from 'express'
import HttpException from '../exceptions/HttpException'

export default function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
    const status = error.status || 500
    const message = error.message || 'Something went wrong'
    res.status(status).send({ status, message })
}