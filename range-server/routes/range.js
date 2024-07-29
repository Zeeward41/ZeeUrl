import express from 'express'
import { getRange } from '../controllers/range.js';

const router = express.Router();

router.get('/range', getRange);

export default router