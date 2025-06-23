import express from 'express'
import { formValidation } from '../middleware/registerValidation.js'
import { handleNewUser } from '../controller/registerController.js'


const router = express.Router()

router.post('/', formValidation, handleNewUser)

export default router
