import { Request, Response } from 'express'

import * as userService from "../services/userService"

export async function signUp(req: Request, res: Response) {
    await userService.signUp(req.body)

    res.sendStatus(201)
}

export async function signIn(req: Request, res: Response) {
    const token = await userService.signIn(req.body)

    res.status(200).send(token)
}

export async function getRandomPlayer(req: Request, res: Response) {
    const userId = Number(res.locals.userId)
    const player = await userService.getRandomPlayer(userId)

    res.status(200).send(player)
}