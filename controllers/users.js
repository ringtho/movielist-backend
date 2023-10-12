const { StatusCodes } = require("http-status-codes")
const User = require("../models/user")
const { BadRequestError, UnAuthorizedError } = require("../errors")
const bcrypt = require('bcrypt')

const getUser = async (req, res) => {
    const { id } = req.user
    const user = await User.findOne({ 
        where: { id }, 
        attributes: { exclude: ['password', 'id']}
    })
    res.status(StatusCodes.OK).json({ user, success: true})
}

const updatePassword = async (req, res) => {
    const { id } = req.user
    const { password, oldPassword } = req.body
    if (!password || !oldPassword) {
        throw new BadRequestError('Please provide the old password and the new password')
    }
    const user = await User.findOne({ where: { id } })
    const match = await bcrypt.compare(oldPassword, user.password)
    if (!match) {
      throw new UnAuthorizedError('Incorrect Old Password')
    }
    await User.update(
      { password },
      {where: { id }, individualHooks: true}
    )
    res.status(StatusCodes.OK).json({ 
        msg: 'Successfully updated the password', success: true })
}

module.exports = {
    getUser,
    updatePassword
}
