import asyncHandler from "../middleware/async.js"
import ErrorResponse from "../utils/errorResponse.js"
import { rangeManager } from "../server.js"
import toBase62 from "../utils/convertBase62.js"
import LinkUrl from '../models/linkUrl.js'

// @desc        Create minify URL
// @route       POST /api/v1/minify/generate
//access        Private
export const generate = asyncHandler(async (req, res, next) => {
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
        success: true
    })

})