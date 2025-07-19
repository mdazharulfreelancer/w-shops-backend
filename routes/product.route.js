const express = require('express');
const {ProductRegister, createTest} = require('../controllers/porduct.controller');
const validateImages = require('../middleware/validateImages');

const router = express.Router();
// Route to register a product
router.get('/register-product', ProductRegister);
router.get('/register-test', validateImages(2), createTest);

module.exports = router;
