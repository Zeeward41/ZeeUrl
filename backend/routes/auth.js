import express from 'express'
import { register, login } from '../controllers/auth.js'
import validateRegister from '../middleware/authValidation.js'

const router = express.Router()

router.post('/register', validateRegister, register)
router.post('/login', login)

export default router
