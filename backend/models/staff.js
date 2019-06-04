const mongoose = require('mongoose');

const staffSchema = mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  salary: { type: String, required: true },
  rate: { type: String, required: true },
  free:{type:Boolean,required:true}
});

module.exports = mongoose.model('Staff', staffSchema);
