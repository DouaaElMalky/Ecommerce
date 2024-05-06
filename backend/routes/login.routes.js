const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login.controller");

router.route("/login").post(loginController.userLogin);

module.exports = router;
