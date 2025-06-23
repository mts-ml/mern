import express from 'express'
import { getServerTime } from '../utils/utils.js'


const router = express.Router()

router.get('/', getServerTime)

export default router
