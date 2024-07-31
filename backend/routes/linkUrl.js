import express from 'express'
import { generate } from '../controllers/minifyUrl.js'

const router = express.Router()

router.get('/generate', generate)

export default router