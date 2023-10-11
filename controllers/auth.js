const { StatusCodes } = require("http-status-codes")

const login = (req, res) => {
    res.status(StatusCodes.OK).json({ msg: "Login" })
}

const register = (req, res) => {
    res.status(StatusCodes.CREATED).json({ msg: "Register User" })
}

module.exports = {
    login,
    register
} 