const { AppointmentSchema } = require("../../model/appointmentModel");
const { Chat } = require("../../model/chatModel");
const { DoctorSchema } = require("../../model/doctorModel");
const { PatientSchema } = require("../../model/patientModel");
const mongoose = require('mongoose');

const User = PatientSchema;
const createAppointment = async (req, res) => {
  try {
    const { problem, time } = req.body;
    const userId = req.userId;
    const data = await AppointmentSchema.create({
      patientId: userId,
      time: time,
      problem: problem,
      progress: "toaccept",
      reviewed: false,
      appointedDoctorId:undefined,
      presentDoctorIds:[],
    });
    res.send(data);
  } catch (e) {
    console.log(e);
    
    res.status(500).send("error while creaating appoiintment");
  }
};
const getPatientAppointments = async (req, res) => {
  const userId = req.userId;
  // console.log(userId);
  const objectId = new mongoose.Types.ObjectId(userId);
  console.log(objectId);
  
  try {
    const appointments = await AppointmentSchema.find({
      patientId: { $elemMatch: { $eq: objectId } },
      progress: { $ne: "done" }
    }).populate({
      path: 'appointedDoctorId',
      select: 'name'
    });
    const modifiedData = appointments.map(appointment => {
      const appointmentObj = appointment.toObject();
      return {
        ...appointmentObj,
        doctorName: appointmentObj.appointedDoctorId && appointmentObj.appointedDoctorId.length > 0
          ? appointmentObj.appointedDoctorId[0].name
          : 'No doctor assigned',
        appointedDoctorId: appointmentObj.appointedDoctorId && appointmentObj.appointedDoctorId.length > 0
          ? appointmentObj.appointedDoctorId[0]._id
          : null
      };
    });
    console.log(modifiedData);
    res.status(200).json(modifiedData);
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error });
  }
};
const acceptYourDoctorForTreatment = async (req, res) => {
  try {
    const { doctorId, appointmentId } = req.body;
    const appointment = await AppointmentSchema.findById(appointmentId);
    appointment.appointedDoctorId = doctorId;
    appointment.presentDoctorIds = [];
    appointment.save();
    appointment.progress="ongoing"
    res.send(appointment);
    return;
  } catch (e) {
    res.status(500).send("Error in accepting doctor", e);
  }
};
const pastappointment=async(req,res)=>{
  try{
    const userId=req.userId;
    const appoiintments=await AppointmentSchema.find({
      patientId:userId,
      progress:"done"
    }).populate({
       path:'appointedDoctorId',
        select:'name'
    })
    console.log(appoiintments);
    res.status(200).send(appoiintments);
  }catch(err){
    console.log(err);
    res.status(500).json("Error")
  }
}
const reviewDoctor = async (req, res) => {
  const { rating, appointmentId } = req.body;
  const userId = req.userId;
  if (rating > 5) {
    res.status(500).send("rating can't be more than 5 ");
    return;
  }
  try {
    const data = await AppointmentSchema.findById(appointmentId);
    if (data.patientId !== userId)
      return res
        .status(500)
        .send("this user is not allowed for this appointment ");
    const review = {
      appointmentId: data._id,
      rate: rating,
    };
    const doctor = await DoctorSchema.findById(data.appointedDoctorId);
    doctor.rating = [...doctor.rating, review];
    await doctor.save();
    data.reviewed = true;
    await data.save();
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: error });
  }
};
const getuserprofile=async(req,res)=>{
  try{
    const Id=req.userId;
   let user=await User.findById(Id);
    console.log(user);
    delete(user.password);
    delete(user.verified);
    delete(user.verifyToken);
    return res.status(200).json({user});
  }catch(err){
    console.log(err);

  }
}
module.exports = {
  getPatientAppointments,
  reviewDoctor,
  acceptYourDoctorForTreatment,
  createAppointment,
  getuserprofile,
  pastappointment
};
