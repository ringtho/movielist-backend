const { StatusCodes } = require("http-status-codes")
const User = require("../models/user")
const { BadRequestError, NotFoundError } = require("../errors")

const getUser = async (req, res) => {
    const { id } = req.user
    const user = await User.findOne({ 
        where: { id }, 
        attributes: { exclude: ['password', 'id']}
    })
    res.status(StatusCodes.OK).json({ user, success: true})
}

const updateUser = async (req, res) => {
    const { id } = req.user
    const { name, profileImg } = req.body
    if (JSON.stringify(req.body) === '{}') {
        throw new BadRequestError('Please provide a name or profile image')
    }
    const data = {}
    if (name) {
        data.name = name
    }
    if (profileImg) {
        data.profileImg = profileImg
    }
    const [rowCount] = await User.update(data, {
        where: { id }, 
        returning: true 
    })
    if (rowCount === 0) {
        throw new NotFoundError('User not Found')
    }
    const updatedUser = await User.findOne({ 
        where: { id }, attributes: { exclude: ['password', 'id']}
    })
    res.status(StatusCodes.OK).json({ user: updatedUser, success: true })
}

module.exports = {
    getUser,
    updateUser
}
