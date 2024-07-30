import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import cors from 'cors'

// Load env vars
dotenv.config({path: './config/.env'})

import range from './routes/range.js'

const app = express()

// Cors
app.use(cors({
    origin: process.env.SERVER_BACKEND,
    methods: ['GET'],
}))

// Body Parser
app.use(express.json())

app.use('/api/v1', range)

// Error
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('Someting went wrong')
})

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))