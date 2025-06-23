import express, { Request, Response } from 'express'
import { verifyAccessToken } from '../middleware/verifyAccessToken.js'


const router = express.Router()
router.get('/', verifyAccessToken, (req: Request, res: Response) => {
    res.json({ message: "Access granted! You have reached the protected route from the backend." })
})

export default router
