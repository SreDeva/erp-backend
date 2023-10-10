const Class = require('../models/classModel');
const Student = require('../models/studentModel');
const Course = require('../models/courseModel');
const Staff = require('../models/staffModel');
const Venue = require('../models/venueModel');

// Controller methods for CRUD operations

// Get all classes
exports.getAllClasses = async (req, res) => {
  const userRole = req.user.role
  if (userRole !== 'admin') {
    return res.status(400).json({ error: "Access denied" })
  }
  try {
    const classes = await Class.find()

    res.status(200).json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a class by ID
exports.getClassById = async (req, res) => {
  const { className } = req.body;

  try {
    const classObj = await Class.findOne({ className })

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
  const userRole = req.user.role
  if (userRole !== 'admin') {
    return res.status(400).json({ error: "Access denied" })
  }

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
  const userRole = req.user.role
  if (userRole !== 'admin') {
    return res.status(400).json({ error: "Access denied" })
  }

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
  const userRole = req.user.role
  if (userRole !== 'admin') {
    return res.status(400).json({ error: "Access denied" })
  }

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


// add student to class
exports.addStudent = async (req,res) => {
  const { className, roll_no } = req.body;
  const userRole = req.user.role
  if (userRole !== 'admin') {
    return res.status(400).json({ error: "Access denied" })
  }

  try {
    const classObj = await Class.findOne({ className })
    if(!classObj){
      return res.status(400).json({ error: "No such Class" })
    }

    const student = await Student.findOne({ roll_no })
    if(!student){
      return res.status(400).json({ error: "No such Student" })
    }
    classObj.students.push(student.roll_no)
    classObj.save();
    res.status(200).json(classObj);

  } catch (error) {
    console.error('Error adding student to class:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// add student to course
exports.addCourse = async (req,res) => {
  const { className, courseCode, staff_id, venueCode } = req.body;
  const userRole = req.user.role
  if (userRole !== 'admin') {
    return res.status(400).json({ error: "Access denied" })
  }

  try {
    const classObj = await Class.findOne({ className })

    if(!classObj){
      return res.status(400).json({ error: "No such Class" })
    }

    const course = await Course.findOne({ courseCode })
    if(!course){
      return res.status(400).json({ error: "No such Course" })
    }

    const staff = await Staff.findOne({ staff_id })
    if(!staff){
      return res.status(400).json({ error: "No such Staff" })
    }

    const venue = await Venue.findOne({ venueCode })
    if(!venue){
      return res.status(400).json({ error: "No such Venue" })
    }

    const newCoures = {
      courseId: courseCode,
      staff: staff_id,
      venue: venueCode,
    }
    classObj.courses.push(newCoures)
    classObj.save();
    res.status(200).json(classObj);

  } catch (error) {
    console.error('Error adding Course to class:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//delete student fron class
exports.deleteStudent = async (req, res) => {
  const { className, roll_no } = req.body;
  const userRole = req.user.role
  if (userRole !== 'admin') {
    return res.status(400).json({ error: "Access denied" })
  }
  try {
    const classObj = await Class.findOne({ className })

    if(!classObj){
      return res.status(400).json({ error: "No such Class" })
    }

    const student = await Student.findOne({ roll_no })
    if(!student){
      return res.status(400).json({ error: "No such Sudent" })
    }

    const index = classObj.students.indexOf(student.roll_no)
    if(!index){
      return res.status(400).json({ error: "No such student in class" })
    }
    classObj.students.splice(index, 1)
    classObj.save();
    res.status(200).json(classObj)
  } catch (error) {
    console.error('Error deleting student from class:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//delete course from class
exports.deleteCourse = async (req, res) => {
  const { className, courseId } = req.body;
  const userRole = req.user.role
  if (userRole !== 'admin') {
    return res.status(400).json({ error: "Access denied" })
  }
  try {
    const classObj = await Class.findOne({ className })
    if(!classObj){
      return res.status(400).json({ error: "No such Class" })
    }

    const course = await Course.findOne({ courseCode: courseId })
    if(!course){
      return res.status(400).json({ error: "No such Course" })
    }

    const index = classObj.courses.indexOf(courseId)
    if(!index){
      return res.status(400).json({ error: "No such student in class" })
    }
    classObj.courses.splice(index, 1)
    classObj.save();
    res.status(200).json(classObj)
  } catch (error){
    console.error('Error deleting Course from class:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//update staff for course in class
exports.updateCourseStaff = async (req, res) => {
  const { className, courseId, staff_id } = req.body;
  const userRole = req.user.role
  if (userRole !== 'admin') {
    return res.status(400).json({ error: "Access denied" })
  }
  try {
    const classObj = await Class.findOne({ className })
    if(!classObj){
      return res.status(400).json({ error: "No such Class" })
    }

    const course = await Course.findOne({ courseCode: courseId })
    if(!course){
      return res.status(400).json({ error: "No such Course" })
    }

    const staff = await Staff.findOne({ staff_id })
    if(!staff){
      return res.status(400).json({ error: "No such Staff" })
    }

    const courseIndex = classObj.courses.findIndex(course => course.courseId === courseId);
    if(courseIndex === -1){
      return res.status(400).json({ error: "No such Course in class" })
    }
    console.log(courseIndex)
    classObj.courses[courseIndex].staff = [staff_id]
    await classObj.save();
    res.status(200).json(classObj)
  } catch (error) {
    console.error('Error updating staff of course from class:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//update venue of the course
exports.updateCourseVenue = async (req, res) => {
  const { className, courseId, venue } = req.body;
  const userRole = req.user.role
  if (userRole !== 'admin') {
    return res.status(400).json({ error: "Access denied" })
  }
  try {
    const classObj = await Class.findOne({ className })
    if(!classObj){
      return res.status(400).json({ error: "No such Class" })
    }

    const course = await Course.findOne({ courseCode: courseId })
    if(!course){
      return res.status(400).json({ error: "No such Course" })
    }

    const venueCode = await Venue.findOne({ venueCode: venue })
    if(!venueCode){
      return res.status(400).json({ error: "No such Venue" })
    }

    const courseIndex = classObj.courses.findIndex(course => course.courseId === courseId);
    if(courseIndex === -1){
      return res.status(400).json({ error: "No such Venue in class" })
    }
    classObj.courses[courseIndex].venue=venue;
    await classObj.save();
    res.status(200).json(classObj)
  } catch (error) {
    console.error('Error updating Venue of course from class:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}