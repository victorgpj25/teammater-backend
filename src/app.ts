import dotenv from 'dotenv'
import express, { json } from 'express'
import 'express-async-errors'
import cors from "cors"

import errorHandler from './middlewares/errorHandler'
import router from './routes/index'

dotenv.config()

const app = express()
app.use(cors())
app.use(json())
app.use(router)
app.use(errorHandler)

const PORT = Number(process.env.PORT) || 5000
app.listen(PORT, () => {
  console.log('server running on port ' + process.env.PORT)
})