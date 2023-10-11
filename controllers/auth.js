const { StatusCodes } = require("http-status-codes")
const User = require('../models/user')

const login = (req, res) => {
    res.status(StatusCodes.OK).json({ msg: "Login" })
}

const register = async (req, res) => {
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({ user })
}

module.exports = {
    login,
    register
} 