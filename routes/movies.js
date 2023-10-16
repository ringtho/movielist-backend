const express = require('express')
const { 
    getAllMovies, 
    createMovie, 
    getSingleMovie, 
    updateMovie, 
    deleteMovie, 
    getMovies,
    updateFavorite 
} = require('../controllers/movies')
const router = express.Router()
const upload = require('../utils/multer')
const { movieValidator } = require('../utils/validation')

router.get('/', getAllMovies)
router.post('/', createMovie)
router.get('/all', getMovies)
// router.post('/', movieValidator, upload.single('image'), createMovie)
router.route('/:id')
    .get(getSingleMovie)
    .put(updateMovie)
    .delete(deleteMovie)

router.route('/:id/favorite')
    .patch(updateFavorite)

module.exports = router