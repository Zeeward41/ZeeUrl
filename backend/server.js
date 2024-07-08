import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import dotenv from 'dotenv'

// Load env vars
dotenv.config({path: './config/config.env'})

const app = express()

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))