import express from 'express'

import { signUp } from '../controllers/userController'
import { validateSignUpReqBody } from '../middlewares/userMiddleware'

const userRouter = express.Router()

userRouter.post("/signup", validateSignUpReqBody, signUp)

export default userRouter