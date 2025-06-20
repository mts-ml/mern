import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { connectDB } from './config/dbConn'

import register from './routes/register'
import login from './routes/login'
import refresh from './routes/refresh'
import logout from './routes/logout'
import teste from './routes/test'


const PORT = process.env.PORT || 3500
const app = express()

// Connect to MongoDB
connectDB()

app.use(express.json())

// CORS
const allowedOrigins = process.env.NODE_ENV === 'production' ?
process.env.FRONT_PROD_URL
:
process.env.FRONT_DEV_URL

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: "Hello World!"
    })
})

app.use('/register', register)
app.use('/login', login)
app.use('/refresh', refresh)
app.use('/test', teste)
app.use('/logout', logout)


mongoose.connection.once('open', () => {
    console.log(`Connected to MongoDB`)
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
