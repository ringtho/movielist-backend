const { StatusCodes } = require("http-status-codes")
const User = require("../models/user")
const { BadRequestError, UnAuthorizedError, NotFoundError } = require("../errors")
const bcrypt = require('bcrypt')
const fs = require('fs')

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

const updateUserDetails = async (req, res) => {
    const { id } = req.user
    if (JSON.stringify(req.body) === '{}') {
      throw new BadRequestError('Please provide a name or profile image')
    }
    const data = req.body
    if (req.file) {
        fs.unlink(data.profileImg, (error) => {
            if (error) console.log(error)
        })
        data.profileImg = req.file.path
    }
    const [rowCount] = await User.update(data, {
      where: { id }
    })
    if (rowCount === 0) {
      throw new NotFoundError(`User with id ${id} not found`)
    }
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password', 'id'] },
    })
    res.status(StatusCodes.OK).json({ 
        msg: 'Successfully updated the user profile', 
        user, 
        success: true 
    })  
}

module.exports = {
    getUser,
    updatePassword,
    updateUserDetails
}
