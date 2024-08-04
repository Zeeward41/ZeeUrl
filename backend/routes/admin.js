import express from 'express'
import { getUsers, getUserUrls } from '../controllers/admin.js'
import { protect, authorize } from '../middleware/auth.js'
import User from '../models/User.js'
import {advancedResults} from '../middleware/advancedResults.js'
import LinkUrl from '../models/linkUrl.js'

const router = express.Router()

router.get('/', protect, authorize('admin'),advancedResults(User), getUsers)
router.get('/:email/minify', protect, authorize('admin'),advancedResults(LinkUrl), getUserUrls)

export default router