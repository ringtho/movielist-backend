const { StatusCodes } = require("http-status-codes")
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { BadRequestError, UnAuthorizedError } = require("../errors")

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide an email or password')
    }
    const user = await User.findOne({ where: { email }})
    if(!user) {
        throw new UnAuthorizedError('Invalid Credentials')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw new UnAuthorizedError('Invalid Credentials')
    }
    const token = await jwt.sign(
        { id: user.id, name: user.name }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_DURATION }
    )
    res.status(StatusCodes.OK).json({ 
        token, 
        user: { name: user.name, email: user.email } 
    })
}

const register = async (req, res) => {
    const user = await User.create(req.body)
    const { name, email } = user
    return res
      .status(StatusCodes.CREATED)
      .json({ user: { name, email }, success: true})
}

module.exports = {
    login,
    register
} 