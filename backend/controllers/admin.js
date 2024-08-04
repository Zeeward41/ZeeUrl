import asyncHandler from "../middleware/async.js"
import User from '../models/User.js'
import linkUrl from "../models/linkUrl.js"
import ErrorResponse from "../utils/errorResponse.js"
import {applyQueryOptions, pagination } from '../middleware/advancedResults.js'

// @desc        Get all users
// @route       GET /api/v1/users
//access        Admin
export const getUsers = asyncHandler(async (req, res, next) => {
    const user = req.user
    const {filters} = req.advancedQuery //ddddd
    let baseQuery = { ...filters}


    const total = await User.countDocuments(baseQuery)
    let query = User.find(baseQuery)
    query = applyQueryOptions(query, req.advancedQuery)

    const users = await query


    

    if (users.length === 0 || !users) {
        return next(new ErrorResponse(`No user Found`, 404))
    }

    const paginations = pagination(query, req.advancedQuery, total)

    return res.status(200).json({
        success: true,
        count: total,
        paginations,
        data: users
    })
}) 


// @desc        Get all minify URL for a specific user
// @route       GET /api/v1/users/:email/minify/
//access        Admin 
export const getUserUrls = asyncHandler(async (req, res, next) => {
    const user = req.user
    const email = req.params.email

    const {filters} = req.advancedQuery

    const userTarget = await User.findOne({email})

    if (!userTarget) {
        return next(new ErrorResponse(`No user found with this email : ${email}`, 404))
    }

    let baseQuery = { $and: [{user: userTarget._id}, filters ]}

    
    const total = await linkUrl.countDocuments(baseQuery)

    let query = linkUrl.find(baseQuery)

    query = applyQueryOptions(query, req.advancedQuery)
    

    const links = await query 

    if (!links || links.length === 0) {
        return next(new ErrorResponse(`No Minify Url found for this user`, 404))
    }

    const paginations = pagination(query, req.advancedQuery, total)

    return res.status(200).json({
        success: true,
        count: total,
        paginations: paginations,
        data: links
    })
})
