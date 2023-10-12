const express = require('express')
const { getUser } = require('../controllers/users')
const router = express.Router()


router.route('/')
    .get(getUser)

module.exports = router