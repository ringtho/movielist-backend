const { StatusCodes } = require("http-status-codes")
const User = require("../models/user")

const getUser = async (req, res) => {
    const { id } = req.user
    const user = await User.findOne({ 
        where: { id }, 
        attributes: { exclude: ['password', 'id']}
    })
    res.status(StatusCodes.OK).json({ user, success: true})
}

module.exports = {
    getUser
}