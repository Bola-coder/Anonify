const express = require("express");

const {
  getAllMessages,
  createNewMessage,
} = require("./../controllers/message");
const router = express.Router();

router.route("/").get(getAllMessages).post(createNewMessage);

module.exports = router;
