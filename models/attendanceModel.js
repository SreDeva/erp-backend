const mongoose = require('mongoose');

const Schema = mongoose.Schema

const attendanceSchema = new Schema({
    studentRollNo: {
        type: Schema.Types.String, // Assuming roll_no is a String field
        ref: 'studentModel',        // Reference to the Student model
        refPath: 'students.roll_no' // Reference path to the 'roll_no' field in the Student model
      },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    hours: [
       {
        hour: {
          type: Number,
          required: true
        },
        isPresent: {
          type: String,
          enum: ['Present', 'Absent', 'Holiday', 'OD', null],
          default: null,
        },
       },
    ]
})
module.exports = mongoose.model('AttendanceModel', attendanceSchema);
