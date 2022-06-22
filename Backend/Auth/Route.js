const express = require("express")
const router = express.Router();
const cors = require('cors');
const { register, login, deleteUser, verify } = require("./Auth");
const { tokenVerify, adminTokenVerify } = require("./../middleware/Auth");
const { uploadNotice, getNotice, deleteNotice } = require("./Notices");
const { uploadNotes, getNotes, getNote, deleteNotes } = require("./Notes");
const { adminRegister, adminLogin, superAdminLogin, deleteAdmin } = require("./AdminAuth");
const { forgotPassword, resetPassword } = require("./Password");
const { createSubject, addSubject, deleteSubject, subjectList, getSubjectList } = require("./Subjects");
const { sessionList, createSession, stopSession, markPresent } = require("./Sessions");
const { adminForgotPassword, adminResetPassword } = require("./AdminPassword");
const { createAssignment, getAssignments, getAssignment, uploadAssignment, deleteAssignment, removeAssignment } = require("./Assignments");
const { webHome } = require("./WebHome");

router.route("/register").post(register)
router.route("/login").post(login);
router.route("/deleteUser").delete(adminTokenVerify, deleteUser);

router.route("/verify/:token").get(verify);
// router.route("/verifyToken").get(tokenVerify);

router.route("/uploadNotice").post(adminTokenVerify, uploadNotice);
router.route("/getNotice").get(tokenVerify, getNotice);
router.route("/deleteNotice").get(adminTokenVerify, deleteNotice);

router.route("/uploadNotes").post(adminTokenVerify, uploadNotes);
router.route("/getNotes").get(tokenVerify, getNotes);
router.route("/getNote").get(adminTokenVerify, getNote);
router.route("/deleteNotes").get(adminTokenVerify, deleteNotes);

router.route("/adminRegister").post(adminTokenVerify, adminRegister);
router.route("/adminLogin").post(adminLogin);
router.route("/superAdminLogin").post(superAdminLogin);
router.route("/deleteAdmin").delete(adminTokenVerify, deleteAdmin);
// router.route("/adminVerifyToken").get(adminTokenVerify);

router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword").post(resetPassword);
// router.route("/resetPassword/:id/:token").get(resetPasswordForm);

router.route("/adminForgotPassword").post(adminForgotPassword);
router.route("/adminResetPassword").post(adminResetPassword);

router.route("/createSubject").post(adminTokenVerify, createSubject);
router.route("/addSubject").post(adminTokenVerify, addSubject);
router.route("/deleteSubject").get(deleteSubject);
router.route("/subjectList").get(tokenVerify, subjectList);
router.route("/getSubjectList").get(adminTokenVerify, getSubjectList);

router.route("/sessionList").get(tokenVerify, sessionList);
router.route("/createSession").post(adminTokenVerify, createSession);
router.route("/stopSession").post(adminTokenVerify, stopSession);
router.route("/markPresent").post(tokenVerify, markPresent);

router.route("/createAssignment").post(adminTokenVerify, createAssignment);
router.route("/getAssignments").get(tokenVerify, getAssignments);
router.route("/getAssignment").get(adminTokenVerify, getAssignment);
router.route("/uploadAssignment").post(tokenVerify, uploadAssignment);
router.route("/deleteAssignment").delete(tokenVerify, deleteAssignment);
router.route("/removeAssignment").get(adminTokenVerify, removeAssignment);

router.route("/webHome").get(adminTokenVerify, webHome);

module.exports = router;