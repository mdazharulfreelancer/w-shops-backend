const express = require("express");
const { createCategory, categoryDelete, getCatrgories } = require("../controllers/category.controller");
const { fileChecker } = require("../middleware/fileChecker");
const router = express.Router();

router.post("/register-category",fileChecker, createCategory)
router.delete("/delete-category/:id", categoryDelete)
router.get("/get-category", getCatrgories)

module.exports = router;