import express from "express"

import { askForTeammate, skipTeammate } from "../controllers/relationsController"
import { verifyReqParams } from "../middlewares/reqParamsMiddleware"
import { verifyToken } from "../middlewares/authMiddleware"

const relationsRouter = express.Router()

relationsRouter.post("/player/ask/:id", verifyToken, verifyReqParams, askForTeammate)
relationsRouter.post("/player/skip/:id", verifyToken, verifyReqParams, skipTeammate)



export default relationsRouter