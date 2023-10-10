const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deptSchema = new Schema({
    deptName: {
        type: String,
        required: true,
        unique: true
    },
    classes: [
        {
                type: Schema.Types.String, // Assuming roll_no is a String field
                ref: 'Class',        // Reference to the Student model
                refPath: 'classes.className' // Reference path to the 'roll_no' field in the Student model
        }
    ],
    staff: [
        {
                type: Schema.Types.String,
                ref: 'StaffModel', // Reference to the Staff model
                refPath: 'staffs.staff_id'
        }
    ]
})

module.exports = mongoose.model('DeptModel', deptSchema);