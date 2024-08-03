import express from 'express'
import { getUsers, getUserUrls } from '../controllers/admin.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

router.get('/', protect, authorize('admin'), getUsers)
router.get('/:email/minify', protect, authorize('admin'), getUserUrls)

export default router