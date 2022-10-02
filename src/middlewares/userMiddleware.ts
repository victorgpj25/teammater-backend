import { Request, Response, NextFunction } from 'express'

import { signUpSchema } from '../schemas/userSchema'

export function validateSignUpReqBody(req: Request, res: Response, next: NextFunction) {
    const validation = signUpSchema.validate(req.body)
    if (validation.error) throw {code: 'unprocessable_signup_body', message: 'Sign-Up failed due to ' + validation.error}
    next();
}