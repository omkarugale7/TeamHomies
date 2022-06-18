const express = require("express")
const router = express.Router();
const { register, login, deleteUser, verify } = require("./Auth");
const { adminAuth } = require("./../middleware/Auth");
const { uploadNotice, getNotice } = require("./Notices");
const { adminRegister, adminLogin } = require("./AdminAuth");


router.route("/register").post(register)
router.route("/login").post(login);
router.route("/deleteUser").delete(adminAuth, deleteUser);

router.route("/verify/:token").get(verify);

router.route("/uploadNotice").post(uploadNotice);
router.route("/getNotice").get(getNotice);

router.route("/adminRegister").post(adminRegister);
router.route("/adminLogin").post(adminLogin);

module.exports = router;
