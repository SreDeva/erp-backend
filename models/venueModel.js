const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  venueCode: {
    type: String,
    required: true,
    unique: true,
  },
  // Add other venue properties here
});

module.exports = mongoose.model('Venue', venueSchema);
