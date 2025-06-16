import express, { Request, Response } from 'express'
import { verifyAccessToken } from '../middleware/verifyAccessToken'
import { verifyRoles } from '../middleware/verifyRoles'
import { ROLES_LIST } from '../config/roles_list'


const router = express.Router()
router.get('/', verifyAccessToken, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), (req: Request, res: Response) => {
    res.json({ success: "Página acessada" })
})

export default router
