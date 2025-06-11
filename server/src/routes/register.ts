import express from 'express'
import { formValidation } from '../middleware/registerValidation'
import { handleNewUser } from '../controller/registerController'


const router = express.Router()

router.post('/', formValidation, handleNewUser)
export default router
