const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const classSchema = new Schema({
  className: {
    type: String,
    required: true,
    unique: true,
  },
  students: [
    {
      type: Schema.Types.String, // Assuming roll_no is a String field
      ref: 'studentModel',        // Reference to the Student model
      refPath: 'students.roll_no' // Reference path to the 'roll_no' field in the Student model
    },
  ],
  courses: [
    {
      courseId: {
        type: Schema.Types.String,
        ref: 'CourseModel', // Reference to the Course model
        refPath: 'course.courseCode'
      },
      staff: [
        {
          type: Schema.Types.String,
          ref: 'StaffModel', // Reference to the Staff model
          refPath: 'staffs.staff_id'
        },
      ],
      venue: {
        type: Schema.Types.String,
        ref: 'VenueModel', // Reference to the Venue model
        refPath: 'venues.venueCode'
      },
    },
  ],
  classAdvisor: {
    staff: [
      {
        staff_id: {
          type: Schema.Types.String,
          ref: 'StaffModel', // Reference to the Staff model
          refPath: 'staffs.staff_id'
        }
      }
    ]
  },
  classTutor: {
    staff: [
      {
        staff_id: {
          type: Schema.Types.String,
          ref: 'StaffModel', // Reference to the Staff model
          refPath: 'staffs.staff_id'
        }
      }
    ]
  }
});

module.exports = mongoose.model('Class', classSchema);
