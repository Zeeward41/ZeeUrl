import ErrorResponse from "../utils/errorResponse.js"
import asyncHandler from "./async.js"


export const checkVisitorCookie = asyncHandler(async (req, res, next) => {
    // cookie visitorId
    let visitorId = req.cookies.visitorId

    if (!visitorId) {
        visitorId = Math.random().toString(36).substring(2, 15)
        // random = 0 - 1
        // convert base 36
        // take values [3 - 15]
        res.cookie('visitorId', visitorId, {
            maxAge: 24 * 60 * 60 * 1000, //1 day (ms)
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        })

    }

    req.visitorId = visitorId

    next()
})