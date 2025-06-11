import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import register from './routes/register'
import cors from 'cors'
import mongoose from 'mongoose'
import { connectDB } from './config/dbConn'


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


mongoose.connection.once('open', () => {
    console.log(`Connected to MongoDB`)
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
