const { StatusCodes } = require("http-status-codes")
const Movie = require("../models/movies")
const { NotFoundError, BadRequestError } = require("../errors")
const fs = require('fs')

/**
 * Returns all movies returning 10 movies 
 */
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
      order: [['favorited', 'DESC'], ['updatedAt', 'DESC']],
    })
    const pages = Math.ceil(movies.count / size)
    res.status(StatusCodes.OK).json({ 
      movies: movies.rows, 
      pages, 
      success: true 
    })
}

/**
 * Returns all movies created by user 
 */
const getMovies = async (req, res) => {
  const { id } = req.user
  const movies = await Movie.findAll({ 
      where: { createdBy: id },
    })
  res.status(StatusCodes.OK).json({ movies, success: true })
}

/**
 * Returns all favorite movies created by user 
 */
const getFavoriteMovies = async (req, res) => {
  const { id } = req.user
  const movies = await Movie.findAll({ 
      where: { createdBy: id, favorited: true },
    })
  res.status(StatusCodes.OK).json({ movies, success: true })
}

/**
 * Creates a new movie
 */
const createMovie = async (req, res) => {
    const data = req.body
    data.createdBy = req.user.id
    if(req.file) {
      data.thumbnail = req.file?.path
    }
    const movie = await Movie.create(data)
    res.status(StatusCodes.CREATED).json({ movie, success: true })
}

/**
 * Returns a single movie by id provided 
 */
const getSingleMovie = async (req, res) => {
  const { user: { id: userId }, params: { id }} = req
  const movie = await Movie.findOne({ 
    where: { id: parseInt(id), createdBy: userId }
  })
  if (!movie) {
    throw new NotFoundError(`Movie with id ${id} not found`)
  }
  res.status(StatusCodes.OK).json({ movie, success: true })
}

/**
 * Deletes a movie thumbnail
 */
const deleteMovieThumbnail = async (req, res) => {
  const {
    user: { id: userId },
    params: { id },
  } = req
  const movie = await Movie.findOne({
    where: { id: parseInt(id), createdBy: userId },
  })
  if (!movie) {
    throw new NotFoundError(`Movie with id ${id} not found`)
  }
  fs.unlink(movie.thumbnail, (error) => {
    if (error) console.log(error)
  })
  await Movie.update(
    { thumbnail: null}, 
    { where: { id: parseInt(id), createdBy: userId } 
  })

  res.status(StatusCodes.OK).json({ 
    msg: "Successfully removed the thumbnail", 
    success: true 
  })
}

/**
 * Updates a movie using the id of the movie and the id of the
 * person who posted the movie
 */
const updateMovie = async (req, res) => {
  const { user: { id: userId }, params: { id }} = req
  if (JSON.stringify(req.body) === '{}') {
    throw new BadRequestError('Please provide a field to update')
  }
  const data = req.body
  if (req.file?.path) {
    fs.unlink(data.thumbnail, (error) => {
      if (error) console.log(error)
    })
    data.thumbnail = req.file?.path
  } else if (req.body.thumbnail === "null") {
    data.thumbnail = null
  }
  const [rowCount] = await Movie.update(
    data, 
    { where: { id: parseInt(id), createdBy: userId }})
  if(rowCount === 0) {
    throw new NotFoundError(`Movie with id ${id} not found`)
  }
  const movie = await Movie.findOne({ where: { id } })
  res.status(StatusCodes.OK).json({ movie, success: true })
}

/**
 * Updates whether a movie is favorite or not using the movie id
 * and the user id
 */
const updateFavorite = async (req, res) => {
  const {
    user: { id: userId },
    params: { id },
  } = req
  const movie = await Movie.findOne({
    where: { id: parseInt(id), createdBy: userId },
  })
  if (!movie) {
    throw new NotFoundError(`Movie with id ${id} not found`)
  }
  const { favorited } = req.body
  if (JSON.stringify(req.body) === '{}') {
    throw new BadRequestError('Please provide the favorite status')
  }
  const [rowCount] = await Movie.update(
    { favorited },
    { where: { id: parseInt(id), createdBy: userId } }
  )
  if (rowCount === 0) {
    throw new BadRequestError('Please provide the favorite status')
  }
  res.status(StatusCodes.OK).json({ 
    msg: `Updated the favorite status of movie with id: ${id}`, 
    success: true })
}

/**
 * Deletes a movie using the movie id
 * and the user id
 */
const deleteMovie = async (req, res) => {
  const { user: { id: userId }, params: { id }} = req
  const movie = await Movie.findOne({
    where: { id: parseInt(id), createdBy: userId },
  })
  if (!movie) {
    throw new NotFoundError(`Movie with id ${id} not found`)
  }
  if(movie.thumbnail) {
     fs.unlink(movie.thumbnail, (error) => {
       if (error) console.log(error)
     })
  }
  await Movie.destroy({ 
    where: { id: parseInt(id) , createdBy: userId }
  })
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
    updateFavorite,
    deleteMovieThumbnail,
    getFavoriteMovies
}