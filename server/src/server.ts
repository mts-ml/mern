import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { connectDB } from './config/dbConn'

import register from './routes/register'
import login from './routes/login'
import refresh from './routes/refresh'
import teste from './routes/teste'


const PORT = process.env.PORT || 3500
const app = express()

// Connect to MongoDB
connectDB()

app.use(express.json())

app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: "Hello World!"
    })
})

app.use('/register', register)
app.use('/login', login)
app.use('/refresh', refresh)
app.use('/teste', teste)


mongoose.connection.once('open', () => {
    console.log(`Connected to MongoDB`)
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
