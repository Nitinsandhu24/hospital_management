const {
  getAllAppointments,
  getDoctorAppointments,
  addPresentDoctor,
  getuserprofile,
  markAppointmentAsDone,
  updateAppointmentProgress,
} = require("../controller/doctor/DoctorAppointmentHandler");
const {
  loginUser,
  signupUser,
  forgotPassword,
  verifyEmailToken,
  verifyForgotPasswordToken,
} = require("../controller/doctor/DoctorAuthenticationHandler");

const DoctorRouter = require("express").Router();
DoctorRouter.post("/add-present-doctor", addPresentDoctor);
DoctorRouter.get("/get-all-appointments", getAllAppointments);
DoctorRouter.get("/get-my-appointments", getDoctorAppointments);
DoctorRouter.route("/user-profile").get(getuserprofile);
DoctorRouter.route("/update-appointment").post(updateAppointmentProgress);
DoctorRouter.route("/mark-done").post(markAppointmentAsDone);

const DoctorAuthRouter = require("express").Router();

DoctorAuthRouter.route("/login").post(loginUser);
DoctorAuthRouter.route("/signup").post(signupUser);
DoctorAuthRouter.route("/reset-password").post(forgotPassword);
DoctorAuthRouter.route("/verify-email-token").post(verifyEmailToken);
DoctorAuthRouter.route("/verify-forgot-password-token").post(
  verifyForgotPasswordToken
);

module.exports = { DoctorRouter, DoctorAuthRouter };
