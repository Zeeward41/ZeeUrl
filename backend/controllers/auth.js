import asyncHandler from "../middleware/async.js"
import User from '../models/User.js'
import ErrorResponse from "../utils/errorResponse.js"

// @desc        Register User
// @route       POST /api/v1/auth/register
//access        Public
export const register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body

    const newUser = await User.create({
        name,
        email,
        password
    })
    res.status(200).json({success: true})

})