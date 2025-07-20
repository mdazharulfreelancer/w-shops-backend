// app.js
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const ProductRoute = require('./routes/product.route');
const ConnectDataBase = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();
const cors = require('cors');
const app = express();
ConnectDataBase();

// ✅ Allow specific frontend origin (your frontend domain)
app.use(cors({
  origin: 'https://w-shops.vercel.app', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));
app.use(fileUpload({ useTempFiles: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log('Welcome to the W-Shop API');
  res.send('Welcome to the W-Shop API');
});
app.use('/api/v1', ProductRoute);
app.use('/api/v1', require('./routes/category.route'));
app.use('/api/v1', require('./routes/subCategory.route'));



app.use(errorHandler); 
module.exports = app;
