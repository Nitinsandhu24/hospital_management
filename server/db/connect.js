const mongoose = require("mongoose");
const { AppointmentSchema } = require("../model/appointmentModel");

const connect = async (url) => {
  try {
    
    await mongoose.connect(url, {
      autoIndex: true, 
    });   
  } catch (e) {
    console.log('Error connecting to MongoDB:', e.message);
  }
};

module.exports = { connect };
