import asyncHandler from "../middleware/async.js"
import User from '../models/User.js'

// @desc        Register User
// @route       POST /api/v1/auth/register
//access        Public
export const register = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    res.status(200).json({success: true})

})