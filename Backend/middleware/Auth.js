const jwt = require("jsonwebtoken");


exports.adminTokenVerify = async (req,res, next) => {

  var token = req.headers['x-access-token'];
  if(!token) return res.status(400).json({message: "No Token Provided !!!"});

  jwt.verify(token, process.env.jwtSecret, (err,decoded) => {
    if(err) {
      res.status(400).json({message: "Invalid Token or Token Expired !!!"});
    }
    // res.status(200).json({message: "Login SuccessFul !!!"});
    next();
  })
}

exports.tokenVerify = async (req,res, next) => {

  var token = req.headers['x-access-token'];
  if(!token) return res.status(400).json({message: "No Token Provided !!!"});

  jwt.verify(token, process.env.jwtSecret, (err,decoded) => {
    if(err) {
      res.status(400).json({message: "Invalid Token or Token Expired !!!"});
    }
    // res.status(200).json({message: "Login SuccessFul !!!"});
    next();
  })
}