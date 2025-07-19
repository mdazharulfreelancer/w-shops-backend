const ErrorHandler = require('./ErrorHandler');

class AuthError extends ErrorHandler {
    constructor(message, statusCode = 401, errorType = 'Unauthorized') {
        super(message, statusCode, errorType);
    }
}

module.exports = AuthError;