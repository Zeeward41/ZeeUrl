import asyncHandler from "../middleware/async.js"
import ErrorResponse from "../utils/errorResponse.js"
import LinkUrl from '../models/linkUrl.js'
import LinkVisits from "../models/LinkVisits.js"
import calculateStats from '../utils/calculateStats.js'

// @desc        Get minifyURL stats
// @route       GET /api/v1/stats/:alias
//access        Private/admin
export const stats = asyncHandler(async (req, res, next) => {
    const token = req.params.alias
    const user = req.user
    console.log(user._id)

    const link = await LinkUrl.findOne({token})

    if (!link) {
        return next(new ErrorResponse(`No link with this alias - ${alias}`, 404))
    }

    if (link.user.toString() !== user._id.toString()) {
        return next(new ErrorResponse('Not authorized to acces this route', 401))
    }
    
    const id = link._id
    const linkCreatedAt = link.createdAt

    const totalVisit = await LinkVisits.find({link: id})


    return res.status(200).json({
        success: true,
        data: calculateStats(totalVisit, linkCreatedAt)
    })

})