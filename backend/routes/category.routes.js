const express = require("express");
const router = express.Router();
const catController = require("../controllers/category.controller");

router.route("/").get(catController.getAllCategories)
.post(catController.addCategory);

module.exports = router;