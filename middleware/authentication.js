const { UnAuthorizedError } = require('../errors')
const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnAuthorizedError('Authentication Invalid')
  }
  const token = authHeader.split(' ')[1]
  try {
    const { email, id } = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { email, id }
    next()
  } catch (error) {
    throw new UnAuthorizedError('Authentication Invalid')
  }
}

module.exports = authenticateUser
