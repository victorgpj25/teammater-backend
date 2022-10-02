import express from 'express'

import userRouter from './userRouter'
import relationsRouter from './relationsRouter'

const router = express.Router()

router.use(userRouter)
router.use(relationsRouter)

export default router