const { StatusCodes } = require("http-status-codes")
const { CustomApiError } = require("../errors")


const errorHandler = (err, req, res, next) => {
    console.log(err.errors[0].path)
    if (err instanceof CustomApiError) {
      return res.status(err.statusCode).json({ msg: err.message })
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: `${err.fields.email} already exists`})
    }

    if(err.errors[0].type === 'Validation error') {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: `Please provide the ${err.errors[0].path}` })
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An error occured, Please try again later"})
}

module.exports = errorHandler