import express from 'express'
import { register } from '../controllers/auth.js'
import validateRegister from '../middleware/authValidation.js'

const router = express.Router()

router.post('/register', validateRegister, register)

export default router