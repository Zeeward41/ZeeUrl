import asyncHandler from "../middleware/async.js"
import User from '../models/User.js'
import ErrorResponse from "../utils/errorResponse.js"
import bcrypt from 'bcryptjs'

// @desc        Register User
// @route       POST /api/v1/auth/register
//access        Public
export const register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.matchedData

    const newUser = await User.create({
        name,
        email,
        password
    })
    res.status(201).json({success: true})

})


// @desc        Login User
// @route       POST /api/v1/auth/login
//access        Public
export const login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.matchedData

    // Validate email and password
    if(!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400))
    }

    // Check for user
    const user = await User.findOne({email: email}).select('+password')

    if(!user) {
        return next(new ErrorResponse(`User not found. Please check your email and try again.`, 404))
    }

    // Check if password Matches
    // use Await because compare is a Promise
    const checkPassword = await bcrypt.compare(password ,user.password)
    console.log(`checkPassword : ${checkPassword}`)

    if (!checkPassword) {
        return next(new ErrorResponse(`Invalid credentials. Please check your password and try again.`, 401))
    }

    const userInfo = user.toObject({virtuals: true}) // copie l'objet sans les metadatas
    delete userInfo.password

    req.session.user = userInfo

    
    res.status(200).json({
        success: true,
        data: userInfo
    })
})


// @desc        Check if the user is authenticated.
// @route       GET /api/v1/auth/check
//access        Public
export const checkAuth = asyncHandler(async (req, res, next) => {
    const user = req.session.user

    if(!user) {
        return res.status(200).json({
            success: false,
            data: {
                user: null,
                isAuthenticated: false
            }
        })
    }

    res.status(200).json({
        success: true,
        data: {
            user: user,
            isAuthenticated: true
        }
    })
    
})

// @desc        Logout User
// @route       GET /api/v1/auth/logout
// @access      Private
export const logout = asyncHandler(async (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return next(new ErrorResponse('Failed to destroy session', 500));
        }
        res.clearCookie('user_session');

        res.status(200).json({
            success: true,
            message: 'Logout successfully'
        })

    })
})