const { StatusCodes } = require('http-status-codes')
const CustomApiError = require('./custom-error')

class UnSupportedFileError extends CustomApiError {
  constructor (message) {
    super(message)
    this.statusCode = StatusCodes.UNSUPPORTED_MEDIA_TYPE
  }
}

module.exports = UnSupportedFileError
