import { Request, Response } from 'express'

import * as relationsService from "../services/relationsService"

export async function askForTeammate(req: Request, res: Response) {
    const userId = Number(res.locals.userId)
    const playerId = Number(req.params.id)
    await relationsService.askForTeammate({userId, playerId})

    res.sendStatus(200)
}

export async function skipTeammate(req: Request, res: Response) {
    const userId = Number(res.locals.userId)
    const playerId = Number(req.params.id)
    await relationsService.skipTeammate({userId, playerId})

    res.sendStatus(200)
}
