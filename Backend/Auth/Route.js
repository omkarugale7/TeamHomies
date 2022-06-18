const express = require("express")
const router = express.Router();
const { register, login, deleteUser, verify } = require("./Auth");
const { adminAuth } = require("./../middleware/Auth");


router.route("/register").post(register)
router.route("/login").post(login);
router.route("/deleteUser").delete(adminAuth, deleteUser);

router.route("/verify/:token").get(verify);

module.exports = router;
