const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  //   userId: String,
  messageContent: {
    type: String,
    required: [true, "You should provide a message content "],
  },
  timeSent: {
    type: Date,
    default: Date.now(),
  },
});

const Messages = mongoose.model("messages", messageSchema);

module.exports = Messages;
