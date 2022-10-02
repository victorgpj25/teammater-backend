import { Request, Response, NextFunction } from 'express'

export function verifyReqParams(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    if (!/^[1-9][0-9]*$/.test(id)) throw {code: 'invalid_req_params', message: 'Id do player solicitado não é válido'}
    
    next();
}