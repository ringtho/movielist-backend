const { StatusCodes } = require('http-status-codes')
const Movie = require('../models/movies')
const { NotFoundError, BadRequestError } = require('../errors')
const fs = require('fs')

/**
 * Reusable function to Check if a movie exists
 * Returns the movie if found
 */

const checkMovieExists = async (movieId, userId) => {
  const movie = await Movie.findOne({
    where: { id: parseInt(movieId), createdBy: userId }
  })
  if (!movie) {
    throw new NotFoundError(`Movie with id ${movieId} not found`)
  }
  return movie
}

/**
 * Returns 10 movies by default sorted by favorited and updated At
 * It returns 10 movies and the number of pages for pagination use
 * in the frontend
 */
const getAllMovies = async (req, res) => {
  const { id } = req.user
  const size = +req.query.size || 10
  const page = +req.query.page || 0
  if (isNaN(page)) {
    throw new BadRequestError('Page number should be a Number')
  }
  const movies = await Movie.findAndCountAll({
    where: { createdBy: id },
    limit: size,
    offset: page * size,
    order: [['favorited', 'DESC'], ['updatedAt', 'DESC']]
  })
  const pages = Math.ceil(movies.count / size)
  res.status(StatusCodes.OK).json({
    movies: movies.rows,
    pages,
    success: true
  })
}

/**
 * Returns all movies created by the authenticated user
 */
const getMovies = async (req, res) => {
  const { id } = req.user
  const movies = await Movie.findAll({
    where: { createdBy: id }
  })
  res.status(StatusCodes.OK).json({ movies, success: true })
}

/**
 * Returns all favorite movies created by the authenticated user
 */
const getFavoriteMovies = async (req, res) => {
  const { id } = req.user
  const movies = await Movie.findAll({
    where: { createdBy: id, favorited: true }
  })
  res.status(StatusCodes.OK).json({ movies, success: true })
}

/**
 * Function to create a new movie
 */
const createMovie = async (req, res) => {
  const data = req.body
  data.createdBy = req.user.id
  if (req.file) {
    data.thumbnail = req.file?.path
  }
  const movie = await Movie.create(data)
  res.status(StatusCodes.CREATED).json({ movie, success: true })
}

/**
 * Returns a single movie by id provided
 */
const getSingleMovie = async (req, res) => {
  const { user: { id: userId }, params: { id } } = req
  const movie = await checkMovieExists(id, userId)
  res.status(StatusCodes.OK).json({ movie, success: true })
}

/**
 * Updates a movie using the id of the movie and the id of the
 * person who posted the movie
 */
const updateMovie = async (req, res) => {
  const { user: { id: userId }, params: { id } } = req
  if ((JSON.stringify(req.body) === '{}' && !req.file) || !req.body) {
    throw new BadRequestError('Please provide a field to update')
  }
  const movieDetails = await checkMovieExists(id, userId)
  const data = req.body
  if (req.file) {
    if (movieDetails.thumbnail !== null) {
      fs.unlink(movieDetails.thumbnail, (error) => {
        if (error) console.log(error)
      })
    }
    data.thumbnail = req.file.path
  } else {
    data.thumbnail = movieDetails.thumbnail
  }
  const [rowCount] = await Movie.update(
    data,
    { where: { id: parseInt(id), createdBy: userId } })
  if (rowCount === 0) {
    throw new BadRequestError(
      'Please provide either a title, genre, plot, releaseDate, rating, notes, favorited or a thumbnail')
  }
  const movie = await Movie.findOne({ where: { id } })
  res.status(StatusCodes.OK).json({ movie, success: true })
}

/**
 * Updates favorite status of a movie using the movie id
 * and the user id
 */
const updateFavorite = async (req, res) => {
  const {
    user: { id: userId },
    params: { id }
  } = req
  await checkMovieExists(id, userId)
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
    success: true
  })
}

/**
 * Deletes a movie using the movie id
 * and the user id
 */
const deleteMovie = async (req, res) => {
  const { user: { id: userId }, params: { id } } = req
  const movie = await checkMovieExists(id, userId)
  if (movie.thumbnail) {
    fs.unlink(movie.thumbnail, (error) => {
      if (error) console.log(error)
    })
  }
  await Movie.destroy({
    where: { id: parseInt(id), createdBy: userId }
  })
  res.status(StatusCodes.OK).json({
    msg: `Successfully deleted movie with id ${id}`,
    data: null,
    success: true
  })
}

/**
 * Deletes a movie thumbnail
 */
const deleteMovieThumbnail = async (req, res) => {
  const {
    user: { id: userId },
    params: { id }
  } = req
  const movie = await checkMovieExists(id, userId)
  if (movie.thumbnail) {
    fs.unlink(movie.thumbnail, (error) => {
      if (error) console.log(error)
    })
  } else {
    throw new NotFoundError(`Movie with id ${id} has no thumbnail`)
  }
  await Movie.update(
    { thumbnail: null },
    { where: { id: parseInt(id), createdBy: userId } }
  )

  res.status(StatusCodes.OK).json({
    msg: 'Successfully removed the thumbnail',
    data: null,
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
