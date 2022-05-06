const express = require("express");
const app = express();
const errorHander = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ErrorResponse = require("./utils/errorResponse");
const path = require("path");

// Config;
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const movie = require("./routes/movieRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", movie);
app.use("/api/v1", user);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.use(errorHander);

module.exports = app;
