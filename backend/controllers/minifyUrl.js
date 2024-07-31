import asyncHandler from "../middleware/async.js"
import ErrorResponse from "../utils/errorResponse.js"
import { rangeManager } from "../server.js"

// @desc        Create minify URL
// @route       POST /api/v1/minify/generate
//access        Private
export const generate = asyncHandler(async (req, res, next) => {
    const t = await rangeManager.getNextNumber()
    console.log(t)

    return res.status(200).json({
        success: true,
        valeur: t
    })

})