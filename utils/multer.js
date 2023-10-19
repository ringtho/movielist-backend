const multer = require('multer')
const path = require('path')
const { UnSupportedFileError } = require('../errors')

// Multer Config
module.exports = multer({
    storage: multer.diskStorage({
        destination: "./images",
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}--${file.originalname}`)
        }
    }),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        if (ext !==".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new UnSupportedFileError("Unsupported file Type. Use 'jpg, jpeg and png formats'"), false)
            return
        }
        cb(null, true)
    }
})