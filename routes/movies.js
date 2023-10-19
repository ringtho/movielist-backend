const express = require('express')
const { 
    getAllMovies, 
    createMovie, 
    getSingleMovie, 
    updateMovie, 
    deleteMovie, 
    getMovies,
    updateFavorite,
    deleteMovieThumbnail 
} = require('../controllers/movies')
const router = express.Router()
const upload = require('../utils/multer')

router.route('/')
  .get(getAllMovies)
  .post(upload.single('image'), createMovie)

router.get('/all', getMovies)

router.route('/:id')
    .get(getSingleMovie)
    .put(upload.single('image'), updateMovie)
    .delete(deleteMovie)

router.route('/:id/image')
    .delete(deleteMovieThumbnail)

router.route('/:id/favorite')
    .patch(updateFavorite)

module.exports = router