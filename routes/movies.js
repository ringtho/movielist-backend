const express = require('express')
const { getAllMovies, createMovie, getSingleMovie, updateMovie, deleteMovie } = require('../controllers/movies')
const router = express.Router()

router.route('/')
    .get(getAllMovies)
    .post(createMovie)
router.route('/:id')
    .get(getSingleMovie)
    .put(updateMovie)
    .delete(deleteMovie)

module.exports = router