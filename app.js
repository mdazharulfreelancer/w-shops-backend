// app.js
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const ProductRoute = require('./routes/product.route');
const ConnectDataBase = require('./config/db');
require('dotenv').config();

const app = express();
ConnectDataBase();

app.use(fileUpload({ useTempFiles: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', ProductRoute);
app.use('/api/v1', require('./routes/category.route'));
app.use('/api/v1', require('./routes/subCategory.route'));

app.get('/', (req, res) => {
  res.send('Welcome to the W-Shop API');
});

module.exports = app;
