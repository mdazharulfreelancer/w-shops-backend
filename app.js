//All Required Modules
const express = require('express');
const bodyParser = require('body-parser');
const ProductRoute = require('./routes/product.route');
const ConnectDataBase = require('./config/db');
// Create an instance of express
const app = express();

require('dotenv').config();
ConnectDataBase();


const fileUpload = require('express-fileupload');
app.use(fileUpload({useTempFiles:true}));
// Middleware to parse JSON bodies
app.use(express.json());
//from data undlend
app.use(bodyParser.urlencoded({ extended: true }));


//All routes
app.use('/api/v1', ProductRoute);
app.use('/api/v1', require('./routes/category.route'));
app.use('/api/v1', require('./routes/subCategory.route'));
app.get('/', (req, res) => {
    res.send('Welcome to the W-Shop API');
});

// Export the app instance for use in other files

module.exports = app;