import express from 'express'
import { register, login, checkAuth } from '../controllers/auth.js'
import {validateRegister, validateLogin} from '../middleware/authValidation.js'

const router = express.Router()

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.get('/check', checkAuth)

export default router
