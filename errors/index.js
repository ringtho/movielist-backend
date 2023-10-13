const CustomApiError = require("./custom-error")
const BadRequestError = require("./bad-request")
const NotFoundError = require("./not-found")
const UnAuthorizedError = require('./unauthorized')
const UnSupportedFileError = require('./unsupported-file')

module.exports = {
    CustomApiError,
    BadRequestError,
    NotFoundError,
    UnAuthorizedError,
    UnSupportedFileError
}