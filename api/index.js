const express = require('express');
const app = require('../app');
const errorHandler = require('../middleware/errorHandler');
const ConnectDataBase = require('../config/db');

const serverless = require('serverless-http');


ConnectDataBase();
//uncaughtException handler
process.on('uncaughtException', (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});

app.use(errorHandler)
//Create an instance of express
// const PORT = process.env.PORT || 3100;
// const server = app.listen(PORT, () => {
//     console.log(`🚀Server is running on http://localhost:${PORT}`);
// });

//unhandledRejection handler
process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});
//serverless
module.exports = serverless(app);
