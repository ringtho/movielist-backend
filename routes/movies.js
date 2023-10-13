const express = require('express')
const { getAllMovies, createMovie, getSingleMovie, updateMovie, deleteMovie } = require('../controllers/movies')
const router = express.Router()
const upload = require('../utils/multer')
const { movieValidator } = require('../utils/validation')

router.get('/', getAllMovies)
router.post('/', movieValidator, upload.single('image'), createMovie)
router.route('/:id')
    .get(getSingleMovie)
    .put(updateMovie)
    .delete(deleteMovie)

module.exports = router