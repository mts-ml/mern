import express, { Request, Response } from 'express'
import { verifyAccessToken } from '../middleware/verifyAccessToken'


const router = express.Router()
router.get('/', verifyAccessToken, (req:Request, res: Response) => {
    res.json({ success: "Página acessada" })
})

export default router
