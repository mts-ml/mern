import express from 'express'
import { getServerTime } from '../utils/utils'


const router = express.Router()

router.get('/', getServerTime)

export default router
