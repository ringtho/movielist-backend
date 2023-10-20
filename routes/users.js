const express = require('express')
const { getUser, updatePassword, updateUserDetails } = require('../controllers/users')
const router = express.Router()
const upload = require('../utils/multer')

router.route('/')
    .get(getUser)

router.patch('/update-password', updatePassword)
router.patch('/update', upload.single('image'), updateUserDetails)

module.exports = router