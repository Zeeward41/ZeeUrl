import asyncHandler from "../middleware/async.js"
import User from '../models/User.js'
import ErrorResponse from "../utils/errorResponse.js"

// @desc        Get User info
// @route       GET /api/v1/user/me
//access        Private
export const getMe = asyncHandler(async (req, res, next) => {
    const userInfo = req.session.user
    const user = await User.findById(userInfo._id).select('-password')

    if(!user) {
        return next(new ErrorResponse('User Not found', 404))
    }
    return res.status(200).json({
        success: true,
        data: user
    })
})