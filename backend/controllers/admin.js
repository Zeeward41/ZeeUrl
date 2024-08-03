import asyncHandler from "../middleware/async.js"
import User from '../models/User.js'
import linkUrl from "../models/linkUrl.js"
import ErrorResponse from "../utils/errorResponse.js"

// @desc        Get all users
// @route       GET /api/v1/users
//access        Admin
export const getUsers = asyncHandler(async (req, res, next) => {
    const user = req.user

    if (user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorized!`, 403))
    }

    const users = await User.find() 

    if (users.length === 0 || !users) {
        return next(new ErrorResponse(`No user Found`, 404))
    }

    return res.status(200).json({
        success: true,
        count: users.length,
        data: users
    })
}) 


// @desc        Get all minify URL for a specific user
// @route       GET /api/v1/users/:email/minify/
//access        Admin 
export const getUserUrls = asyncHandler(async (req, res, next) => {
    const user = req.user
    const email = req.params.email

    if (user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorized!`, 403))
    }

    const userTarget = await User.findOne({email})

    if (!userTarget) {
        return next(new ErrorResponse(`No user found with this email : ${email}`, 404))
    }

    const links = await linkUrl.find({user: userTarget._id})

    if (!links || links.length === 0) {
        return next(new ErrorResponse(`No Minify Url found for this user`, 404))
    }

    return res.status(200).json({
        success: true,
        count: links.length,
        data: links
    })
})

