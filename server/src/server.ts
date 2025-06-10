import express, { NextFunction, Request, Response } from 'express'


const PORT = process.env.PORT || 3500
const app = express()

app.use(express.json())

// app.use((req: Request, res: Response, next: NextFunction) => {
    
// })

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: "Hello World!"
    })
    console.log('Hello World!')    
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
