const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
  date: { type: String, required: true },
  slots: { type: Object, required: true }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
