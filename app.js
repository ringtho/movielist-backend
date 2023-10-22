require('dotenv').config()
require('express-async-errors')

const { connectDB } = require('./db/connectDB')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const cors = require('cors')

const express = require('express')
const app = express()

// Routers
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const moviesRouter = require('./routes/movies')

// Middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const authMiddleware = require('./middleware/authentication')

// Security packages (middlewares)
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//   })
// )

app.use(cors())
// app.use(xss())
// app.use(helmet())
app.use(express.json())

// Makes the images folder public
app.use('/api/v1/images', express.static('images'))

const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

app.get('/', (req, res) => {
  res.send(`
  <h1>MovieReel API</h1>
  <p>
  Check out the 
  <a href='/api-docs'>Documentation</a>
  </p>
  
  `)
})

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', authMiddleware, usersRouter)
app.use('/api/v1/movies', authMiddleware, moviesRouter)
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Hello World' })
})

app.use(errorHandler)
app.use(notFoundMiddleware)

/**
 * Function to connect to DB and start the server
 */
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