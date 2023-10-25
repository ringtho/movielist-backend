const { StatusCodes } = require("http-status-codes")
const { CustomApiError } = require("../errors")


const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res
      .status(err.statusCode)
      .json({ error: err.message, success: false })
  } 
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ error: `${err.fields.email} already exists!`, success: false })
  }
  if (err.name === 'MulterError') {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ 
        error: 'Please provide an image file with a key "thumbnail" during image upload', 
        success: false 
      })
  }
  if (err.name === 'SequelizeValidationError') {
    const name = err?.errors[0].path
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: `Please provide ${
        name.startsWith('e' || 'o' || 'i') ? 'an' : 'a'
      } ${name}`,
      success: false,
    })
  }
  if (err.name === 'SyntaxError') {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: "Please check your json body for syntax errors", 
        success: false })
  }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Something went wrong, Please try again later',
      success: false,
    })
}

module.exports = errorHandler