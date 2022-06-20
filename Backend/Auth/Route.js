const express = require("express")
const router = express.Router();
const { register, login, deleteUser, verify } = require("./Auth");
const { adminAuth } = require("./../middleware/Auth");
const { uploadNotice, getNotice } = require("./Notices");
const { adminRegister, adminLogin, superAdminLogin } = require("./AdminAuth");
const { forgotPassword, resetPassword, resetPasswordForm } = require("./Password");
const { subjectList } = require("./Subjects");
const { sessionList, createSession } = require("./Sessions");
const { adminForgotPassword, adminResetPassword, adminResetPasswordForm } = require("./AdminPassword");

router.route("/register").post(register)
router.route("/login").post(login);
router.route("/deleteUser").delete(adminAuth, deleteUser);

router.route("/verify/:token").get(verify);
// router.route("/verifytoken").get(tokenVerify);

router.route("/uploadNotice").post(uploadNotice);
router.route("/getNotice").get(getNotice);

router.route("/adminRegister").post(adminRegister);
router.route("/adminLogin").post(adminLogin);
router.route("/superAdminLogin").post(superAdminLogin);

router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword").post(resetPassword);
// router.route("/resetPassword/:id/:token").get(resetPasswordForm);

router.route("/adminForgotPassword").post(adminForgotPassword);
router.route("/adminResetPassword").post(adminResetPassword);

router.route("/subjectList").get(subjectList);
router.route("/sessionList").get(sessionList);
router.route("/createSession").post(createSession);

module.exports = router;
