
import { getRangeNumber } from '../utils/rangeService.js'

// @desc        Get Range
// @route       GET /api/v1/range
export const getRange = async (req, res) => {
  try {
    const range = await getRangeNumber();
    res.json(range);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};