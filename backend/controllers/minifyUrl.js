import asyncHandler from "../middleware/async.js"
import ErrorResponse from "../utils/errorResponse.js"
import { rangeManager } from "../server.js"
import toBase62 from "../utils/convertBase62.js"
import LinkUrl from '../models/linkUrl.js'

// @desc        Create minify URL
// @route       POST /api/v1/minify/generate
//access        Private
export const generateLink = asyncHandler(async (req, res, next) => {
    const userId = req.user.id

    const {url, alias} = req.matchedData

    let token  = ""

    if (!alias) {
        const number = await rangeManager.getNextNumber()
        token = toBase62(number)
    } else {
        token = alias
    }

    const newLink = await LinkUrl.create({
        token,
        link_original: url,
        user: userId
    })

    return res.status(201).json({
        success: true,
        message: `Link created successfully`
    })

})


// @desc        delete minify URL
// @route       DELETE /api/v1/minify/:alias
//access        Private or admin
export const deleteLink = asyncHandler(async (req, res, next) => {
    const alias = req.params.alias

    const link = await LinkUrl.findOne({ token: alias })

    if (!link) {
        return next(new ErrorResponse(`No link with this alias - ${alias}`, 404))
    }
   
    if(link.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to Delete this link`,401 ))
    }

    await link.deleteOne()
    
    return res.status(200).json({
        success: true,
        message: `Link with alias ${alias} deleted sucessfully`
    })
})


// @desc        Get all minify URL from the user. (if admin get all url)
// @route       GET /api/v1/minify
//access        Private / admin
export const getUrls = asyncHandler(async (req, res, next) => {
    const user = req.user

    let links

    if (user.role === 'admin') {
        links = await LinkUrl.find()
    } else {
        links = await LinkUrl.find({user: user.id})
    }

    if(!links || links.length === 0) {
        const errorMessage = user.role === 'admin'?
        'No URLs found in the system' :
        `No URLs found for user ${user.name}`
        return next(new ErrorResponse(`No Urls found`, 404))
    }

    return res.status(200).json({
        success: true,
        count: links.length,
        data: links
    })
})

// @desc        Update a specific minify URL.
// @route       PATCH /api/v1/minify/:alias
//access        Private / admin
export const updateUrl = asyncHandler(async (req, res, next) => {

    const token = req.params.alias
    const updateData = req.matchedData
    const user = req.user

    let link = await LinkUrl.findOne({token})

    if (!link) {
        return next(new ErrorResponse(`No Minify Url with this alias : ${token}`,404))
    }

    if(link.user.toString() !== user.id && user.role !== 'admin') {
        return next(new ErrorResponse(`No authorized to update review`,401))
    }

    link = await LinkUrl.findOneAndUpdate(
        {token},
        {$set: updateData},
        {new: true, runValidators: true}
    )

    return res.status(200).json({
        success: true,
        data: link
    })

})


// a mettre dasn un controller admin

// @desc        Get a specific minify URL from an user.
// @route       GET /api/v1/users/:email/minify/:alias
//access        Admin 

// @desc        Get all minify URL for a specific user
// @route       GET /api/v1/users/:email/minify/
//access        Admin 


// @desc        Get all users
// @route       GET /api/v1/users
//access        Admin