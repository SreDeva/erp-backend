const Class = require('../models/classModel');
const Student = require('../models/studentModel');
const Course = require('../models/courseModel');
const Staff = require('../models/staffModel');
const Venue = require('../models/venueModel');

// Controller methods for CRUD operations

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate('students')
      .populate({
        path: 'courses.courseId',
        populate: {
          path: 'staff venue',
          select: 'name', // Replace with the fields you want to select
        },
      });

    res.status(200).json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a class by ID
exports.getClassById = async (req, res) => {
  const { id } = req.params;

  try {
    const classObj = await Class.findById(id)
      .populate('students')
      .populate({
        path: 'courses.courseId',
        populate: {
          path: 'staff venue',
          select: 'name', // Replace with the fields you want to select
        },
      });

    if (!classObj) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.status(200).json(classObj);
  } catch (error) {
    console.error('Error fetching class by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new class
exports.createClass = async (req, res) => {
  const { className, students, courses } = req.body;

  try {
    const classObj = await Class.create({
      className,
      students,
      courses,
    });

    res.status(200).json(classObj);
  } catch (error) {
    console.error('Error creating class:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a class by ID
exports.updateClass = async (req, res) => {
  const { id } = req.params;
  const { className, students, courses } = req.body;

  try {
    const updatedClass = await Class.findByIdAndUpdate(id, {
      className,
      students,
      courses,
    });

    if (!updatedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.status(200).json(updatedClass);
  } catch (error) {
    console.error('Error updating class:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a class by ID
exports.deleteClass = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedClass = await Class.findByIdAndRemove(id);

    if (!deletedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.status(204).json();
  } catch (error) {
    console.error('Error deleting class:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
