import express from 'express'
import { loginValidation } from '../middleware/loginValidation.js'
import { handleLogin } from '../controller/authController.js'


const router = express.Router()

router.post('/', loginValidation, handleLogin)

export default router
