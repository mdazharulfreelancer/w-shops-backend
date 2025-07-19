//Global Error Handler type Json
const ErrorHandler = require('../utilities/ErrorHandler')

module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorType = err.errorType || 'Server Error';
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        error :{
        statusCode,
        errorType,
        message
        }
    });
}