const User = require("./../model/user");
const bcrypt = require("bcryptjs")
const sendEmail = require("./../utils/email");
const Log = require("./../model/log");


const jwt = require('jsonwebtoken');
const util = require('util');
const jwtVerifyAsync = util.promisify(jwt.verify);
const { findById } = require("./../model/user");

exports.register = async (req, res, next) => {
  const { username, name, password, role, email, phone, branch, prn, graduation_year } = await req.body;
  const checkUser = await User.findOne({"email": email});
  // console.log(checkUser);
  if(checkUser) {
      if(checkUser.verified)
      return res.status(400).json({ message: "Email Already Exists !!!"});
      else {
        await User.findOneAndDelete({"email": email});
      }
  }
  if (password.length < 8) {
    return res.status(400).json({ message: "Password less than 8 characters" })
  }
  await bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      username,
      name,
      password: hash,
      role,
      email,
      phone,
      branch,
      prn,
      graduation_year
    })
      .then((user) => {
        var token = jwt.sign({ id: user._id }, process.env.jwtSecret, {
            expiresIn: 86400,
          }
        );
        try {
          const message = `${process.env.BASE_URL}/verify/${token}`;
          sendEmail(user.email, "Verify Email !!!", message);

        } catch (err) {
          res.status(400).json({message: "Invalid Email Address !!!"});
        }
        res.status(201).json({
          message: "User Successfully Created",
          user: user._id,
          token: token
        });
      })
      .catch((error) =>
        res.status(400).json({
          message: "There was a problem registering the User !!!",
          error: error.message,
        })
      );
  });
}

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    })
  }
  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.status(400).json({
        message: "User not found",
        error: "User not found",
      })
    } else if(!user.verified) {
      res.status(400).json({
        message: "User Not Verified",
        error: "User Not Verified",
      });
    } else {
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          var token = jwt.sign({ id: user._id }, process.env.jwtSecret, {
            expiresIn: 86400,
          }
          );
          Log.create({
            username,
            "role": user.role
          }).then(log => console.log(log));
          res.status(201).json({
            message: "User successfully Logged in",
            user: user,
            token: token
          });
        } else {
          res.status(400).json({ message: "Invalid Password !!!" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
}

exports.deleteUser = async (req, res, next) => {
  const { username } = req.query;
  await User.findOne({"username": username})
    .then(user => user.remove())
    .then(user =>
      res.status(201).json({ message: "User successfully deleted", user })
    )
    .catch(error =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    )
}

exports.verify = async (req,res) => {
  try {
    const { id } = jwt.verify(req.params.token, process.env.jwtSecret);

    await User.findByIdAndUpdate(id,{verified: true});
    
  } catch (e) {
    res.status(400).json({message : "Invalid Token or Token Expired !!!"});
  }
  res.status(201).json({message : "Correct !!!", User});
  
}