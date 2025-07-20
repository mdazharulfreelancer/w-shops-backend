const express = require('express');
const {ProductRegister, createTest} = require('../controllers/porduct.controller');
const validateImages = require('../middleware/validateImages');

const router = express.Router();
// Route to register a product
router.post('/register-product', ProductRegister);
router.post('/register-test', validateImages(2), createTest);

module.exports = router;
