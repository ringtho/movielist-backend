const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./custom-error");


class UnAuthorizedError extends CustomApiError {
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnAuthorizedError