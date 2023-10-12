const { StatusCodes } = require("http-status-codes")
const Movie = require("../models/movies")
const { NotFoundError } = require("../errors")

const getAllMovies = async (req, res) => {
    const { id } = req.user
    const movies = await Movie.findAll({ where : { createdBy: id }})
    res.status(StatusCodes.OK).json({ movies, success: true })
}

const createMovie = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Create movies' })
}

const getSingleMovie = async (req, res) => {
  const { user: { id: userId }, params: { id }} = req
  const movie = await Movie.findOne({ where: { id , createdBy: userId }})
  if (!movie) {
    throw new NotFoundError(`Movie with id ${id} not found`)
  }
  res.status(StatusCodes.OK).json({ movie, success: true })
}

const updateMovie = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Update movie' })
}

const deleteMovie = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Delete movie' })
}

module.exports = {
    getAllMovies,
    createMovie,
    getSingleMovie,
    updateMovie,
    deleteMovie
}