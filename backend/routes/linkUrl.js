import express from 'express'
import { generate } from '../controllers/minifyUrl.js'
import {validateUrl} from '../middleware/minifyLinkValidation.js'

const router = express.Router()

router.post('/generate', validateUrl,generate)

export default router