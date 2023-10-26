const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { BadRequestError, UnAuthorizedError } = require('../errors')

/**
 * This function handles the login (authentication) of a user.
 * It returns a token that can be used in other protected requests
 */
const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide an email or password')
  }
  const user = await User.findOne({ where: { email } })
  if (!user) {
    throw new UnAuthorizedError('Invalid Credentials')
  }
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw new UnAuthorizedError('Invalid Credentials')
  }
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_DURATION }
  )
  res.status(StatusCodes.OK).json({
    token,
    user: { name: user.name, email: user.email }
  })
}

/**
 * This function handles registration of a new user using
 * email, name and password fields
 */
const register = async (req, res) => {
  const user = await User.create(req.body)
  const { name, email } = user
  return res
    .status(StatusCodes.CREATED)
    .json({ user: { name, email }, success: true })
}

module.exports = {
  login,
  register
}
