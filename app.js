require('dotenv').config()
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const { connectDB } = require('./db/connectDB')


const app = express()

// Routers
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')

// Middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const authMiddleware = require('./middleware/authentication')

const corsOptions = {
    origin: 'https://localhost:5050'
}
app.use(cors(corsOptions))
app.use(express.json())


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', authMiddleware, usersRouter)
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Hello World' })
})

app.use(errorHandler)
app.use(notFoundMiddleware)


const PORT = process.env.PORT || 5050
const start = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
          console.log(`Server listening on port ${PORT}`)
        })
    }catch (error) {
        console.log(error)
    }
}

start()