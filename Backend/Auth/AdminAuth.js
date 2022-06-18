const Admin = require("./../model/admin");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { findById } = require("./../model/admin");

exports.adminRegister = async (req, res) => {
  const { username, password, name, role, email, joining_year } = await req.body;
  if (password.length < 8) {
    return res.status(400).json({ message: "Password less than 8 characters" });
  }
  await bcrypt.hash(password, 10).then(async (hash) => {
    await Admin.create({
      username,
      name,
      password: hash,
      role,
      email,
      joining_year,
    })
      .then((admin) => {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign({ id: admin._id }, process.env.jwtSecret, {
          expiresIn: maxAge,
        });
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });
        res.status(201).json({
          message: "Admin Successfully Created",
          admin: admin._id,
        });
      })
      .catch((error) =>
        res.status(400).json({
          message: "Admin Not successfully created",
          error: error.message,
        })
      );
  });
};

exports.adminLogin = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "Username or Password not present",
      })
    }
    try {
        console.log(username);
      const admin = await Admin.findOne({ "username" : username });
      console.log(admin);
      if (!admin) {
        res.status(400).json({
          message: "Login not successful",
          error: "Admin not found",
        })
      } else {
        bcrypt.compare(password, admin.password).then(function (result) {
          if (result) {
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign(
              { id: admin._id },
              process.env.jwtSecret,
              {
                expiresIn: maxAge,
              }
            );
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: maxAge * 1000,
            });
            res.status(201).json({
              message: "Admin successfully Logged in",
              admin: admin._id,
            });
          } else {
            res.status(400).json({ message: "Wrong Password !!!" });
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
