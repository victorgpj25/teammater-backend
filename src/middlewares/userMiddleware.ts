import { Request, Response, NextFunction } from 'express'

import { signUpSchema, signInSchema, editProfileSchema } from '../schemas/userSchema'

export function validateSignUpReqBody(req: Request, res: Response, next: NextFunction) {
    const validation = signUpSchema.validate(req.body)
    if (validation.error) throw {code: 'unprocessable_signup_body', message: 'Sign-Up failed due to ' + validation.error}
    next();
}

export function validateSignInReqBody(req: Request, res: Response, next: NextFunction) {
    const validation = signInSchema.validate(req.body)
    if (validation.error) throw {code: 'unprocessable_signin_body', message: 'Sign-In failed due to ' + validation.error}
    next()
}

export function validateEditProfileReqBody(req: Request, res: Response, next: NextFunction) {
    const validation = editProfileSchema.validate(req.body)
    if (validation.error) throw {code: 'unprocessable_edit_body', message: 'Edit profile failed due to ' + validation.error}
    next()
}