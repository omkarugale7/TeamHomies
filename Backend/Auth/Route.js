const express = require("express")
const router = express.Router();
const { register, login, deleteUser, verify } = require("./Auth");
const { adminAuth } = require("./../middleware/Auth");
const { uploadNotice, getNotice } = require("./Notices");
const { uploadNotes, getNotes } = require("./Notes");
const { adminRegister, adminLogin, superAdminLogin, deleteAdmin } = require("./AdminAuth");
const { forgotPassword, resetPassword } = require("./Password");
const { subjectList } = require("./Subjects");
const { sessionList, createSession, stopSession, markPresent } = require("./Sessions");
const { adminForgotPassword, adminResetPassword } = require("./AdminPassword");
const { getAssignments, uploadAssignments } = require("./Assignments");
const { webHome } = require("./WebHome");

router.route("/register").post(register)
router.route("/login").post(login);
router.route("/deleteUser").delete(deleteUser);

router.route("/verify/:token").get(verify);
// router.route("/verifytoken").get(tokenVerify);

router.route("/uploadNotice").post(uploadNotice);
router.route("/getNotice").get(getNotice);

router.route("/uploadNotes").post(uploadNotes);
router.route("/getNotes").get(getNotes);

router.route("/adminRegister").post(adminRegister);
router.route("/adminLogin").post(adminLogin);
router.route("/superAdminLogin").post(superAdminLogin);
router.route("/deleteAdmin").delete(deleteAdmin);

router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword").post(resetPassword);
// router.route("/resetPassword/:id/:token").get(resetPasswordForm);

router.route("/adminForgotPassword").post(adminForgotPassword);
router.route("/adminResetPassword").post(adminResetPassword);

router.route("/subjectList").get(subjectList);
router.route("/sessionList").get(sessionList);
router.route("/createSession").post(createSession);
router.route("/stopSession").post(stopSession);
router.route("/markPresent").post(markPresent);

router.route("/getAssignments").get(getAssignments);
router.route("/uploadAssignments").post(uploadAssignments);

router.route("/webHome").get(webHome);

router.route("/")

module.exports = router;