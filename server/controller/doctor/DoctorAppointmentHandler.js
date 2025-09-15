const { AppointmentSchema } = require("../../model/appointmentModel");
const { DoctorSchema } = require("../../model/doctorModel");
const User = DoctorSchema;
const getAllAppointments = async (req, res) => {
  try {
    const data = await AppointmentSchema.find({
      progress: "toaccept",
    }).populate({
      path: "patientId",
      select: "name",
    });

    const modifiedData = data.map((appointment) => ({
      ...appointment.toObject(),
      patientId: appointment.patientId[0] || null,
    }));

    res.status(200).json(modifiedData);
  } catch (error) {
    console.log(error);

    res.status(500).send({ err: error });
  }
};
const updateAppointmentProgress = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    console.log(appointmentId);

    if (!appointmentId) {
      return res
        .status(400)
        .json({ error: "Appointment ID and progress are required." });
    }

    const updatedAppointment = await AppointmentSchema.findByIdAndUpdate(
      appointmentId,
      { progress: "ongoing" }
    );
    updatedAppointment.appointedDoctorId = req.userId;
    await updatedAppointment.save();
    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    res.status(200).json(updatedAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating appointment progress." });
  }
};
const getDoctorAppointments = async (req, res) => {
  // on going appointment of this doctor
  try {
    const data = await AppointmentSchema.find({
      appointedDoctorId: req.userId,
      progress: "ongoing",
    });
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: error });
  }
};

const addPresentDoctor = async (req, res) => {
  const { appointmentId } = req.body;
  const doctorId = req.userId;
  try {
    const data = await AppointmentSchema.findById(appointmentId);
    if (!data.presentDoctorIds.includes(doctorId)) {
      data.presentDoctorIds.push(doctorId);
    }
    await data.save();
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: error });
  }
};
const getuserprofile = async (req, res) => {
  try {
    const Id = req.userId;
    let user = await User.findById(Id);
    console.log(user);
    delete user.password;
    delete user.verified;
    delete user.verifyToken;
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
  }
};
// In your controller (doctorController.js or appointmentController.js)

const markAppointmentAsDone = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointment = await AppointmentSchema.findById(appointmentId);
    if (!appointment) return res.status(404).send("Appointment not found");

    appointment.progress = "done";
    await appointment.save();
    res.status(200).json({ message: "Appointment marked as done" });
  } catch (error) {
    console.error("Error in markAppointmentAsDone:", error);
    res.status(500).send("Error marking appointment as done");
  }
};

module.exports = {
  getAllAppointments,
  addPresentDoctor,
  getDoctorAppointments,
  getuserprofile,
  updateAppointmentProgress,
  markAppointmentAsDone,
};
