const User = require("./../model/user");
const bcrypt = require("bcryptjs")
const sendEmail = require("./../utils/email");

const jwt = require('jwt-simple');


exports.forgotPassword = async (req, res) => {

  const { email } = req.body;

  console.log(email);

  User.findOne({'email': email}).then((user,err)=>{
    if(user) {
          var payload = {
              id: user._id,
              email: email
          };

          var secret = user.password + '-' + process.env.jwtSecret;

          var token = jwt.encode(payload, secret);

          try {
            const message = `${process.env.BASE_URL}` + "/resetPassword/" + payload.id + '/' + token;
            sendEmail(email,"Password Help Arrived !!!",message);
          } catch(err) {
            res.status(400).json({message: err});
          }
          res.status(201).json({message: "Kindly Check Your Mail For Further Instructions !!!"});
    } else {
      res.status(400).json({ message: "User Not Found !!!" });
    }
  })
};

exports.resetPasswordForm = async (req,res,next) => {
  const {id , token} = req.params;
  // console.log(id);
  User.findById(id).then(user => {
      var secret = user.password + '-' + process.env.jwtSecret;
      var payload = jwt.decode(token, secret);
      if(payload.id === id) {
        // res.render();
        res.status(200).json({message: "You Can Reset The Password Now !!!"});
      } else {
        res.status(400).json({message: "Invalid Token OR Token Expired !!!", error: err});
      }
  }).catch(err => {
    res.status(400).json({message: "User Not Found !!!", error: err});
  })
};

exports.resetPassword = function (req, res, next) {
  const {id , token, password} = req.body;
  console.log(id + " " + token + " " + password);
  User.findById(id).then(user => {
    var secret = user.password + '-' + process.env.jwtSecret;
    console.log(token);
    try {
      var payload = jwt.decode(token, secret);
      bcrypt.hash(password, 10)
	    .then(newPassword => {
        user.password = newPassword;
        user.save();
        res.status(200).json({message: "Password Updated SuccessFully !!!"});
      }).catch(err => {
        res.status(400).json({message: "Internal Error !!!", error: err});
      })
     } catch(err) {
       res.status(400).json({message: "Invalid Token OR Token Expired !!!", error: err});
  }
}).catch(err => {
  res.status(400).json({message: "User Not Found !!!", error: err});
})
};
