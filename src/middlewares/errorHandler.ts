import { Request, Response, NextFunction } from 'express'

export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (error.code === "email_conflict") {
        return res.status(409).send({ErrorMessage: error.message})
    }
    if (error.code === "unprocessable_signup_body") {
        return res.status(422).send({ErrorMessage: error.message})
    }
    
    res.sendStatus(500)
}