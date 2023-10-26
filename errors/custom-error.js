class CustomApiError extends Error {
  // eslint-disable-next-line no-useless-constructor
  constructor (message) {
    super(message)
  }
}

module.exports = CustomApiError
