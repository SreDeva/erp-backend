const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema(
    {
        courseName: {
            type: String,
            required: true,
        },
        courseCode: {
            type: String,
            required: true,
            unique: true, 
        },
    }
);


module.exports = mongoose.model('courseModel', courseSchema);