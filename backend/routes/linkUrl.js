import express from 'express'
import { generateLink, deleteLink, getUrls, updateUrl } from '../controllers/minifyUrl.js'
import {validateUrl, validateUpdateUrl} from '../middleware/minifyLinkValidation.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

router.post('/generate', protect, validateUrl, generateLink)
router.delete('/:alias', protect, authorize('user', 'admin'), deleteLink)
router.get('/', protect, authorize('user', 'admin'), getUrls)
router.put('/:alias', protect, authorize('user', 'admin'), validateUpdateUrl, updateUrl)

export default router