const { StatusCodes } = require("http-status-codes")
const Movie = require("../models/movies")
const { NotFoundError, BadRequestError } = require("../errors")
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')
const { validationResult, matchedData } = require('express-validator')

const getAllMovies = async (req, res) => {
    const { id } = req.user
    const movies = await Movie.findAll({ where : { createdBy: id }})
    res.status(StatusCodes.OK).json({ movies, success: true })
}

const createMovie = async (req, res) => {
//   const errors  = validationResult(req.body)
//   console.log(errors)
//   if (errors.isEmpty()){
    const result = await cloudinary.uploader.upload(req?.file?.path)
    const data = req.body
    data.createdBy = req.user.id
    data.thumbnail = result.secure_url
    data.cloudinaryId = result.public_id
    const movie = await Movie.create(data)
    res.status(StatusCodes.OK).json({ movie, success: true })
//   }
//   res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array()})
  
}

const getSingleMovie = async (req, res) => {
  const { user: { id: userId }, params: { id }} = req
  const movie = await Movie.findOne({ where: { id , createdBy: userId }})
  if (!movie) {
    throw new NotFoundError(`Movie with id ${id} not found`)
  }
  res.status(StatusCodes.OK).json({ movie, success: true })
}

const updateMovie = async (req, res) => {
  const { user: { id: userId }, params: { id }} = req
  if (JSON.stringify(req.body) === '{}') {
    throw new BadRequestError('Please provide a field to update')
  }
  const [rowCount] = await Movie.update(
    req.body, 
    { where: { id, createdBy: userId}})
  if(rowCount === 0) {
    throw new NotFoundError(`Movie with id ${id} not found`)
  }
  const movie = await Movie.findOne({ where: { id } })
  res.status(StatusCodes.OK).json({ movie, success: true })
}

const deleteMovie = async (req, res) => {
  const { user: { id: userId }, params: { id }} = req
  const movie = await Movie.destroy({ where: { id , createdBy: userId }})
  if (!movie) {
    throw new NotFoundError(`Movie with id ${id} not found`)
  }
  res.status(StatusCodes.OK).json({ 
    msg: `Successfully deleted movie with id ${id}`, 
    success: true 
  })
}

module.exports = {
    getAllMovies,
    createMovie,
    getSingleMovie,
    updateMovie,
    deleteMovie
}