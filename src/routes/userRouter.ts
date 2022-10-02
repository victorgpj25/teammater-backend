import express from 'express'

import { signUp, signIn } from '../controllers/userController'
import { validateSignUpReqBody, validateSignInReqBody } from '../middlewares/userMiddleware'

const userRouter = express.Router()

userRouter.post("/signup", validateSignUpReqBody, signUp)
userRouter.post('/signin', validateSignInReqBody, signIn)

export default userRouter