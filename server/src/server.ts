import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { connectDB } from './config/dbConn.js'
import path from 'path'

import register from './routes/register.js'
import login from './routes/login.js'
import refresh from './routes/refresh.js'
import logout from './routes/logout.js'
import teste from './routes/test.js'
import serverTime from './routes/serverTime.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const PORT = process.env.PORT || 3500
const app = express()

// Connect to MongoDB
connectDB()

app.use(express.json())

// CORS
const allowedOrigins = process.env.NODE_ENV === 'production' ?
    process.env.FRONTEND_PROD_URL
    :
    process.env.FRONTEND_DEV_URL

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
app.use('/server-time', serverTime)

app.all(/.*/, (req: Request, res: Response) => {
    res.status(404)

    const errorResponse = {
        status: 404,
        error: "Not found",
        message: `Route ${req.originalUrl} not found on the server.`
    }

    if (req.accepts('json')) {
        res.json({ errorResponse })
    } else {
        res.type('txt').send(`Error 404 - Not Found: ${req.originalUrl}`)
    }
})


mongoose.connection.once('open', () => {
    console.log(`Connected to MongoDB`)
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
