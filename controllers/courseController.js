const Course = require('../models/courseModel');

const mongoose = require('mongoose');


// Get all courses
const getCourses = async (req, res) => {
    const userRole = req.user.role
    if (userRole !== 'admin') {
        return res.status(400).json({ error: "Access denied" })
    }
    console.log("hi")
    try {
      const courses = await Course.find();
  
      res.status(200).json(courses);
    } catch (error) {
      console.error('Error getting courses:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Create a new course
const createCourse = async (req, res) => {
    console.log("h1")
    const { courseName, courseCode } = req.body;
    const userRole = req.user.role
    if (userRole !== 'admin') {
        return res.status(400).json({ error: "Access denied" })
    }

        // Validate request data
        if (!courseName || !courseCode) {
            return res.status(400).json({ error: 'Please provide both courseName and courseCode.' });
        }
        console.log(courseCode)
    try {
        

        // Create a new course
        const course = await Course.create({ courseName, courseCode });

        res.status(200).json(course);
    } catch (error) {
        // Check if the error is a duplicate key error (11000)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.courseCode) {
            return res.status(400).json({ error: 'Course with the same courseCode already exists.' });
        }

        console.error('Error creating course:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getCourses,
    createCourse
}