import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.use(express.json())
//
import userRouter from './routers/userRouters.js'
//
app.use('/api', userRouter)


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running at ${PORT}`))
