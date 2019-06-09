const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  appid: { type: String, required: true },
  packageid: { type: String, required: true },
  oil: { type: String, required: true },
  airfiltering: { type: String, required: true },
  additional: { type: String, required: true },
  total: { type: String, required: true },
});

module.exports = mongoose.model('Payment', paymentSchema);
