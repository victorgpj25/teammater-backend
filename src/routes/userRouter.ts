import express from "express"

import { signUp, signIn, getRandomPlayer, getTeammates } from "../controllers/userController"
import { validateSignUpReqBody, validateSignInReqBody } from "../middlewares/userMiddleware"
import { verifyToken } from "../middlewares/authMiddleware"

const userRouter = express.Router()

userRouter.post("/signup", validateSignUpReqBody, signUp)
userRouter.post("/signin", validateSignInReqBody, signIn)

userRouter.get("/player", verifyToken, getRandomPlayer)
userRouter.get("/teammates", verifyToken, getTeammates)

userRouter.put("/profile/edit", verifyToken, validateEditProfileReqBody, editProfile)

export default userRouter