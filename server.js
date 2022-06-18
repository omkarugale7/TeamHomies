const express = require("express");
const connectDB = require("./db");
var fs = require('fs');
const path = require('path');
var bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const { adminAuth, userAuth } = require("./middleware/Auth.js");
require("dotenv").config();


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

connectDB();


const server = app.listen(port, () =>
  console.log(`Server Connected to port ${port}`)
)
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})

const loc = __dirname + '/Auth/Route';

app.use("/", require(loc));

app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/student", userAuth, (req, res) => res.send("User Route"));

app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.send("Hey Logout SuccessFul !!!");
  res.redirect("/")
})
