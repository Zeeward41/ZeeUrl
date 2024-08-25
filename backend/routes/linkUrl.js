import express from 'express'
import { generateLink, deleteLink, getUrls, updateUrl, redirect } from '../controllers/minifyUrl.js'
import {validateUrl, validateUpdateUrl} from '../middleware/minifyLinkValidation.js'
import { protect, authorize } from '../middleware/auth.js'
import {advancedResults} from '../middleware/advancedResults.js'
import LinkUrl from '../models/linkUrl.js'
import { checkVisitorCookie } from '../middleware/checkVisitorCookie.js'

const router = express.Router()

router.post('/generate', protect, validateUrl, generateLink)
router.delete('/:alias', protect, authorize('user', 'admin'), deleteLink)
router.get('/', protect, authorize('user', 'admin'),advancedResults(LinkUrl), getUrls)
router.put('/:alias', protect, authorize('user', 'admin'), validateUpdateUrl, updateUrl)
router.get('/:alias', checkVisitorCookie, redirect)

export default router