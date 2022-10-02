import { Request, Response, NextFunction } from 'express'

import { validateToken } from '../utils/encryptUtils'


export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization
    const token = authorization?.replace('Bearer ', '')
  
    if (!token) throw ({code: 'no_token', message: 'Token de acesso não encontrado'})
    const userId = await validateToken(token)
    res.locals.userId = userId

    next()
}