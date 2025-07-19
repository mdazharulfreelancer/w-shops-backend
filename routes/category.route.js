const express = require("express");
const { createCategory, categoryDelete } = require("../controllers/category.controller");
const { fileChecker } = require("../middleware/fileChecker");
const router = express.Router();

router.post("/register-category",fileChecker, createCategory)
router.delete("/delete-category/:id", categoryDelete)

module.exports = router;