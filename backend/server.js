import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import errorHandler from './middleware/error.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'

import RangeManager from './utils/rangeManager.js'


// Load env vars
dotenv.config({path: './config/.env'})

// import Routes
import auth from './routes/auth.js'
import user from './routes/user.js'
import minify from './routes/linkUrl.js'
import admin from './routes/admin.js'

// import DB
import connectDB from './config/db.js'

// Connect DB
connectDB()

const app = express()
export const rangeManager = new RangeManager()

// Cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Cookie Parser
app.use(cookieParser())

// Session and Cookie
app.use(session({
    name: 'user_session',
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: process.env.NODE_ENV === 'development' ? false: true,
        httpOnly: true,
        maxAge: 60 * 60 * 1000 // 1h en ms  
    }
}))

// GetRange
rangeManager.getNewRange()

// Mount Routers
app.use('/api/v1/auth', auth)
app.use('/api/v1/user', user)
app.use('/api/v1/minify', minify)
app.use('/api/v1/users', admin)

// ErrorHandler
app.use(errorHandler)


if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))