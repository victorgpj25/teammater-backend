import express from "express"

import { signUp, signIn, getRandomPlayer, getTeammates, editProfile, getProfileData } from "../controllers/userController"
import { validateSignUpReqBody, validateSignInReqBody, validateEditProfileReqBody } from "../middlewares/userMiddleware"
import { verifyToken } from "../middlewares/authMiddleware"

const userRouter = express.Router()

userRouter.post("/signup", validateSignUpReqBody, signUp)
userRouter.post("/signin", validateSignInReqBody, signIn)

userRouter.get("/player", verifyToken, getRandomPlayer)
userRouter.get("/teammates", verifyToken, getTeammates)

userRouter.get("/profile/data", verifyToken, getProfileData)
userRouter.put("/profile/edit", verifyToken, validateEditProfileReqBody, editProfile)

export default userRouter