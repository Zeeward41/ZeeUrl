import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import errorHandler from './middleware/error.js'
import cors from 'cors'

// import Routes
import auth from './routes/auth.js'

// Load env vars
dotenv.config({path: './config/config.env'})

// import DB
import connectDB from './config/db.js'

// Connect DB
connectDB()

const app = express()

// Body Parser
app.use(express.json())

// Cors
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Mount Routers
app.use('/api/v1/auth', auth)

// ErrorHandler
app.use(errorHandler)


if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))