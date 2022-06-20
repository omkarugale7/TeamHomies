const express = require("express");
const connectDB = require("./db");
var fs = require('fs');
const path = require('path');
var bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./model/user');
const Admin = require('./model/admin');
const jwt = require('jwt-simple');
const cookieParser = require("cookie-parser");
const { adminAuth, userAuth } = require("./middleware/Auth.js");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.set('view engine', 'ejs');
app.set('views')

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

app.get("/resetPassword/:id/:token", (req,res) => {
  const {id , token} = req.params;
  // console.log(id);
  User.findById(id).then(user => {
    var secret = user.password + '-' + process.env.jwtSecret;
    var payload = jwt.decode(token, secret);
    if(payload.id === id) {
      res.render(__dirname + '/views/resetPasswordForm',{id,token});
      // res.status(200).json({message: "You Can Reset The Password Now !!!"});
    } else {
      res.status(400).json({message: "Invalid Token OR Token Expired !!!", error: err});
    }
  }).catch(err => {
    res.status(400).json({message: "User Not Found !!!", error: err});
  })
})

app.get("/adminResetPassword/:id/:token", (req,res) => {
  const {id , token} = req.params;
  // console.log(id);
  Admin.findById(id).then(admin => {
    var secret = admin.password + '-' + process.env.jwtSecret;
    var payload = jwt.decode(token, secret);
    if(payload.id === id) {
      res.render(__dirname + '/views/adminResetPasswordForm',{id,token});
      // res.status(200).json({message: "You Can Reset The Password Now !!!"});
    } else {
      res.status(400).json({message: "Invalid Token OR Token Expired !!!", error: err});
    }
  }).catch(err => {
    res.status(400).json({message: "User Not Found !!!", error: err});
  })
})