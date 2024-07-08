import asyncHandler from "../middleware/async.js"

// @desc        Register User
// @route       POST /api/v1/auth/register
//access        Public
export const register = asyncHandler(async (req, res, next) => {
    res.status(200).json({success: true})

})