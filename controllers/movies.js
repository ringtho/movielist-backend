const { StatusCodes } = require("http-status-codes")
const Movie = require("../models/movies")

const getAllMovies = async (req, res) => {
    const movies = await Movie.findAll()
    res.status(StatusCodes.OK).json({ movies, success: true })
}

const createMovie = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Create movies' })
}

const getSingleMovie = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Get Single movie' })
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