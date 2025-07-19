const express   = require('express');
const { createSubCategory, delteSubcategoryMultiple } = require('../controllers/subCategory.controller');
const validateImages = require('../middleware/validateImages');

const router = express.Router();

router.post('/register-subcategory', validateImages(2), createSubCategory)
router.delete('/detele-subcategory-multiple',validateImages(2), delteSubcategoryMultiple)
module.exports = router;