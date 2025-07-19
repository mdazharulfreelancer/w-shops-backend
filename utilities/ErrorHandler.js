class ErrorHandler extends Error { 
    constructor(message, statusCode = 500, errorType = 'Server Error') {
        super(message);
        this.statusCode = statusCode;
        this.errorType = errorType;

        Error.captureStackTrace(this, this.constructor);
    }
    
}
module.exports = ErrorHandler; 