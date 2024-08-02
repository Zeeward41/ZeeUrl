import express from 'express'
import { generate } from '../controllers/minifyUrl.js'
import {validateUrl} from '../middleware/minifyLinkValidation.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/generate', protect, validateUrl, generate)

export default router