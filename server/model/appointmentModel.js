const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  progress: String, 
  presentDoctorIds: [{ type: String }], 
  appointedDoctorId:[{type:mongoose.Schema.ObjectId,ref:'doctor'}],
  patientId:[{type:mongoose.Schema.Types.ObjectId,ref:'patient'}],
  problem: String,
  time: String,
  reviewed :Boolean
})

const AppointmentSchema = mongoose.model( "Appointment", appointmentSchema);
module.exports = { AppointmentSchema } 