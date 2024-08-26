import express from 'express'
import { protect, authorize } from '../middleware/auth.js'
import { stats } from '../controllers/stats.js'

const router = express.Router()

router.get('/', protect, authorize('user', 'admin'), stats)

export default router