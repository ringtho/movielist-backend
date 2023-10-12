const { StatusCodes } = require("http-status-codes")
const { CustomApiError } = require("../errors")


const errorHandler = (err, req, res, next) => {
  console.log(err)
    if (err instanceof CustomApiError) {
      return res.status(err.statusCode).json({ error: err.message, success: false })
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: `${err.fields.email} already exists!`, success: false})
    }

    if (
      err.errors[0].type === 'Validation error' ||
      err.errors[0].type === 'notNull Violation'
    ) {
      const name = err?.errors[0].path
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: `Please provide ${
          name.startsWith('e' || 'o' || 'i') ? 'an' : 'a'
        } ${name}`,
        success: false
      })
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occured, Please try again later", success: false })
}

module.exports = errorHandler