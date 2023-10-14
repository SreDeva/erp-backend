const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    roll_no: {
      type: String,
      required: true,
      unique: true
    },
    reg_no: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String,
      required: true,
    },
    phone_no: {
      type: Number,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    Class: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startDate:{
      type: Date,
      default: Date.now,
      required: true
    },
    semester: {
      type: Number,
      default: 1
    },
    year: {
      type: Number,
      default: 1,
    }
    
  },
  { timestamps: true }
);







module.exports = mongoose.model('studentModel', studentSchema);
