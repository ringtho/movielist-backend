const { StatusCodes } = require("http-status-codes")
const Movie = require("../models/movies")
const { NotFoundError, BadRequestError } = require("../errors")
const upload = require('../utils/multer')

// Returns movies with pagination - size = 10
const getAllMovies = async (req, res) => {
    const { id } = req.user
    const size = +req.query.size || 0
    const page = +req.query.page || 0
    if (isNaN(page)) {
      throw new BadRequestError('Page number should be a Number')
    }
    const movies = await Movie.findAndCountAll({ 
      where: { createdBy: id },
      limit: size,
      offset: page * size,
      order: [[ 'favorited', 'DESC' ]]
    })
    const pages = Math.ceil(movies.count / size)
    res.status(StatusCodes.OK).json({ 
      movies: movies.rows, 
      pages, 
      success: true 
    })
}

const getMovies = async (req, res) => {
  const { id } = req.user
  const movies = await Movie.findAll({ 
      where: { createdBy: id },
    })
  res.status(StatusCodes.OK).json({ movies, success: true })
}

const createMovie = async (req, res) => {
    const data = req.body
    data.createdBy = req.user.id
    data.thumbnail = req.file?.path || ''
    console.log(data)
    const movie = await Movie.create(data)
    res.status(StatusCodes.CREATED).json({ movie, success: true })
}

const getSingleMovie = async (req, res) => {
  const { user: { id: userId }, params: { id }} = req
  const movie = await Movie.findOne({ 
    where: { id, createdBy: userId }
  })
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
    { where: { id, createdBy: userId }})
  if(rowCount === 0) {
    throw new NotFoundError(`Movie with id ${id} not found`)
  }
  const movie = await Movie.findOne({ where: { id } })
  res.status(StatusCodes.OK).json({ movie, success: true })
}

const updateFavorite = async (req, res) => {
  const {
    user: { id: userId },
    params: { id },
  } = req
  const favorited = req.body.favorited
  console.log(favorited)
  if (JSON.stringify(req.body) === '{}') {
    throw new BadRequestError('Please provide the favorite option')
  }
  const [rowCount] = await Movie.update(
    { favorited },
    { where: { id, createdBy: userId } }
  )
  if (rowCount === 0) {
    throw new NotFoundError(`Movie with id ${id} not found`)
  }
  res.status(StatusCodes.OK).json({ 
    msg: `Updated the favorite status of movie with id: ${id}`, 
    success: true })
}

const deleteMovie = async (req, res) => {
  const { user: { id: userId }, params: { id }} = req
  const movie = await Movie.destroy({ 
    where: { id: parseInt(id) , createdBy: userId }
  })
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
    deleteMovie,
    getMovies,
    updateFavorite
}