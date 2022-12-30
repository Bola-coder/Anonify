const express = require("express");

const authcontroller = require("./../controllers/userAuth");

const router = express.Router();

router.route("/signup").post(authcontroller.signup);
router.route("/login").post(authcontroller.login);

module.exports = router;
