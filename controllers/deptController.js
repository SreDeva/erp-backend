const Dept = require('../models/deptModel');
const Class = require('../models/classModel')
const Student = require('../models/studentModel');
const Course = require('../models/courseModel');
const Staff = require('../models/staffModel');
const Venue = require('../models/venueModel');
const requireAuth = require('../middleware/requireAuth');

// Controller methods for CRUD operations

// Get all depts
exports.getAllDeptes = async (req, res) => {
  const userRole = req.user.role
  if (userRole !== 'admin') {
    return res.status(400).json({ error: "Access denied" })
  }
  try {
    const depts = await Dept.find()

    res.status(200).json(depts);
  } catch (error) {
    console.error('Error fetching depts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a class by ID
exports.getDeptById = async (req, res) => {
  const { deptName } = req.body;

  try {
    const deptObj = await Dept.findOne({ deptName })

    if (!deptObj) {
      return res.status(404).json({ error: 'Dept not found' });
    }

    res.status(200).json(deptObj);
  } catch (error) {
    console.error('Error fetching class by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new class
exports.createDept = async (req, res) => {
  const { deptName, classes, staff } = req.body;
  const userRole = req.user.role
  if (userRole !== 'admin') {
    return res.status(400).json({ error: "Access denied" })
  }
    // Check if the Dept already exists in the database
    const dept = await Dept.findOne({deptName})
    if (dept) {
      return res.status(400).json({ error: "Dept already exists" })
    }

  try {
    for (let index = 0; index < classes.length; index++) {
        const element = classes[index];
        const classObj = await Class.findOne({ className: element })
        if(!classObj){
            return res.status(400).json({ error: "No such Class" })
        }
    }
    for (let index = 0; index < staff.length; index++) {
        const element = staff[index];
        const staffObj = await Staff.findOne({ staff_id: element })
        if(!staffObj){
            return res.status(400).json({ error: "No such Staff" })
        }
    }
    const deptObj = await Dept.create({
      deptName,
      classes,
      staff,
    });

    res.status(200).json(deptObj);
  } catch (error) {
    console.error('Error creating class:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a class by ID
exports.updateDept = async (req, res) => {
  const { deptName, classes, staff, newDeptName } = req.body;
  const userRole = req.user.role
  if (userRole !== 'admin') {
    return res.status(400).json({ error: "Access denied" })
  }

  try {
    const deptObj = await Dept.findOne({ deptName })
    if(!deptObj){
      return res.status(400).json({ error: "No such Dept" })
    }

    if(newDeptName){
      deptObj.deptName = newDeptName;
    }
    if(staff){
        deptObj.staff = staff;
    }
    if(courses){
        deptObj.classes = classes;
    }

    const updatedDept = await deptObj.save();

    res.status(200).json(updatedDept);
  } catch (error) {
    console.error('Error updating class:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a class by ID
exports.deleteDept = async (req, res) => {
  const { id } = req.params;
  const userRole = req.user.role
  if (userRole !== 'admin') {
    return res.status(400).json({ error: "Access denied" })
  }

  try {
    const deletedDept = await Dept.findByIdAndRemove(id);

    if (!deletedDept) {
      return res.status(404).json({ error: 'Dept not found' });
    }

    res.status(204).json();
  } catch (error) {
    console.error('Error deleting class:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};