import ErrorResponse from "../utils/errorResponse.js"
import asyncHandler from "../middleware/async.js"
import User from "../models/User.js"

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
    if(!req.session.user) {
        return next(new ErrorResponse('Not authorized to acces this route', 401))
    }

    const user = await User.findById(req.session.user._id).select('-password')

    if(!user) {
        return next(new ErrorResponse('User not Found', 404))
    }

    req.user = user
    next()
})

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403))
        }

        next()
    }
}