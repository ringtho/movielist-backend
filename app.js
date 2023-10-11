require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectDB } = require('./db/connectDB')


const app = express()

// Routers
const authRouter = require('./routes/auth')

// Middleware
const notFoundMiddleware = require('./middleware/not-found')

const corsOptions = {
    origin: 'https://localhost:5050'
}
app.use(cors(corsOptions))
app.use(express.json())


app.use('/api/v1/auth', authRouter)
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Hello World' })
})
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