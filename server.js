import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
//dirname defination...
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//dirname defination...
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
//
import userRouter from './routers/userRouters.js'
import productRouter from './routers/productRouter.js'
//
//for images folder..
app.use('/public', express.static(path.join(__dirname, 'uploads')))
//for images folder..
app.use('/api', userRouter)
app.use('/api', productRouter)


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running at ${PORT}`))
