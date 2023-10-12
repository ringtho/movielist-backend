const express = require('express')
const { getUser, updatePassword } = require('../controllers/users')
const router = express.Router()

router.route('/')
    .get(getUser)

router.patch('/update-password', updatePassword)

module.exports = router