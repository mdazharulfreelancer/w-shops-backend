const ErrorHandler = require('./ErrorHandler');

class ValidationError extends ErrorHandler {
    constructor(message, statusCode = 400, errorType = 'Validation Error') {
        super(message, statusCode, errorType);
    }
}

module.exports = ValidationError;