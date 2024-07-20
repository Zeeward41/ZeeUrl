import express from 'express'
import { register, login, checkAuth, logout } from '../controllers/auth.js'
import {validateRegister, validateLogin} from '../middleware/authValidation.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.get('/check', checkAuth)
router.get('/logout', protect, logout)

export default router
