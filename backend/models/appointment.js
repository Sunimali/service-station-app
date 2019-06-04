const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  vehicle: { type: String, required: true },
  owner: { type: String, required: true },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
