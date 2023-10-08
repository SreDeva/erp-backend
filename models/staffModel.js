const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  staff_id: {
    type: String,
    required: true,
    unique: true
  }
  // Add other staff properties here
});

module.exports = mongoose.model('StaffModel', staffSchema);
