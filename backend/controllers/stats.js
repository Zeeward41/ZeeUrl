import asyncHandler from "../middleware/async.js"
import ErrorResponse from "../utils/errorResponse.js"
import LinkUrl from '../models/linkUrl.js'
import LinkVisits from "../models/LinkVisits.js"
import calculateStats from '../utils/calculateStats.js'

// @desc        Get minifyURL stats
// @route       GET /api/v1/stats/:alias
//access        Private/admin
export const stats = asyncHandler(async (req, res, next) => {
    const user = req.user
    const reqQuery = {...req.query}

    const token = reqQuery.alias
    
    let startDate = reqQuery.startDate 
    let endDate = reqQuery.endDate 

    const link = await LinkUrl.findOne({token})

    if (!link) {
        return next(new ErrorResponse(`No link with this alias - ${token}`, 404))
    }

    if (user._id.toString() !== link.user.toString() && user.role.toString() !== 'admin' ) {
        return next(new ErrorResponse('Not authorized to acces this route', 401))
    }

    // Check Date
    if (!startDate) { // no startDate
        startDate = link.createdAt.toISOString()
    } else {
    // timestamp to ISO 8601(format valid mongoose)
        startDate = new Date(Number(startDate)*1000).toISOString() // * 1000 -> s to ms
    } 

    if (!endDate) { // on endDate
        endDate = new Date()
    } else {
    // timestamp to ISO 8601(format valid mongoose)
        endDate = new Date(Number(endDate)*1000).toISOString() // * 1000 -> s to ms
    }

    const totalVisit = await LinkVisits.find({
        link: link._id,
        accessedAt: {
            $gte: startDate,
            $lte: endDate
        }
    })
    
    const uniqueVisit = await LinkVisits.aggregate([
        // step 1 : all link
        { $match: {
            link: link._id,
            accessedAt: {
                $gte: new Date(startDate), // need to change the format it doesnt work for aggregate ...
                $lte: new Date(endDate)
               
            }
        }},

        // step 2 : grouper par visitorId et obtenir le plus ancien (accessedAt)
        {
            $group: {
                _id: "$visitorId",
                firstVisit: { $first: "$accessedAt"},
                doc: {$first: "$$ROOT"} // conserver l'integralité des infos du lien
            }
        }
    ])

    const result = calculateStats(totalVisit.length, uniqueVisit.length, startDate)

    return res.status(200).json({
        success: true,
        data: {
            stats: result,
            link,
            date: {
                startDate,
                endDate
            }
        }
        
    })

})