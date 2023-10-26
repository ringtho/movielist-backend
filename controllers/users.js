const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')
const { BadRequestError, UnAuthorizedError, NotFoundError } = require('../errors')
const bcrypt = require('bcrypt')
const fs = require('fs')

/**
 * This reusable function checks if a user exists and
 * returns the user
 * @param { id }
 * @returns user
 */
const checkUserExists = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password', 'id'] }
  })
  if (!user) {
    throw new NotFoundError(`User with id ${id} not found`)
  }
  return user
}

/**
 * This function returns the user profile information about
 * the authenticated user
 */
const getUser = async (req, res) => {
  const { id } = req.user
  const user = await checkUserExists(id)
  res.status(StatusCodes.OK).json({ user, success: true })
}

/**
 * This function updates the password of the authenticated user
 */
const updatePassword = async (req, res) => {
  const { id } = req.user
  const { password, oldPassword } = req.body
  if (!password || !oldPassword) {
    throw new BadRequestError(
      'Please provide the old password and the new password'
    )
  }
  const user = await User.findOne({ where: { id } })
  const match = await bcrypt.compare(oldPassword, user.password)
  if (!match) {
    throw new UnAuthorizedError('Incorrect Old Password')
  }
  await User.update(
    { password },
    { where: { id }, individualHooks: true }
  )
  res.status(StatusCodes.OK).json({
    msg: 'Successfully updated the password', success: true
  })
}

/**
 * This function updates the name and profileImg of
 * the authenticated user
 */
const updateUserDetails = async (req, res) => {
  const { id } = req.user
  const userDetails = await checkUserExists(id)
  const data = {}
  if ((JSON.stringify(req.body) === '{}' && !req.file) || !req.body) {
    throw new BadRequestError('Please provide a name or thumbnail')
  }
  if (req.body.name) {
    data.name = req.body.name
  }
  if (req.file) {
    if (userDetails.profileImg !== null) {
      fs.unlink(userDetails.profileImg, (error) => {
        if (error) console.log(error)
      })
    }
    data.profileImg = req.file.path
  }
  const [rowCount] = await User.update(data, {
    where: { id }
  })

  if (rowCount === 0) {
    throw new BadRequestError('Please provide a name or thumbnail')
  }
  const user = await checkUserExists(id)
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
