import { Request, Response, NextFunction } from 'express'

export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (error.code === 'signin_failed') {
        return res.status(401).send({ErrorMessage: error.message})
    }
    if (error.code === 'no_token') {
        return res.status(401).send({ErrorMessage: error.message})
    }
    if (error.code === 'invalid_token') {
        return res.status(401).send({ErrorMessage: error.message})
    }
    if (error.code === 'no_players') {
        return res.status(404).send({ErrorMessage: error.message})
    }
    if (error.code === 'player_not_found') {
        return res.status(404).send({ErrorMessage: error.message})
    }
    if (error.code === "email_conflict") {
        return res.status(409).send({ErrorMessage: error.message})
    }
    if (error.code === "unprocessable_signup_body") {
        return res.status(422).send({ErrorMessage: error.message})
    }
    if (error.code === "unprocessable_signin_body") {
        return res.status(422).send({ErrorMessage: error.message})
    }
    if (error.code === "unprocessable_edit_body") {
        return res.status(422).send({ErrorMessage: error.message})
    }
    if (error.code === 'invalid_req_params') {
        return res.status(422).send({ErrorMessage: error.message})
    }
    
    res.sendStatus(500)
}