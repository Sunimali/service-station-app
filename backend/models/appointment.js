const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  owner: { type: String, required: true },
  vehicle: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  package: { type: String, required: true },
  staffid: { type: String, required: true },
  accepted: { type: Boolean, required: true },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
