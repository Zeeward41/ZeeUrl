import express from 'express'
import { getUsers } from '../controllers/admin.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

router.get('/', protect, authorize('admin'), getUsers)

export default router