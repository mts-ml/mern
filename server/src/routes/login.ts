import express from 'express'
import { loginValidation } from '../middleware/loginValidation'
import { handleLogin } from '../controller/authController'


const router = express.Router()

router.post('/', loginValidation, handleLogin)

export default router
