const express = require("express");
const morgan = require("morgan");
const app = express();

const messageRouter = require("./routes/message");
const userRouter = require("./routes/user");
const errorHandler = require("./controllers/errorHandler");

if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/messages", messageRouter);
app.use("/user", userRouter);

app.use(errorHandler);

module.exports = app;
