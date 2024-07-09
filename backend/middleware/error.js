import ErrorResponse from "../utils/errorResponse.js"

const errorHandler = (err, req, res, next) => {

    let error = {...err}

    error.message = err.message

    //Log to console for dev
    console.log(err.stack.red)

    // Mongoose duplicate key
    if(err.code === 11000) {
        const message = `Duplicate field value entered`
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

export default errorHandler