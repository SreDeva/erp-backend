const express = require('express');
const { 
    createStudent,
    getStudent,
    getAdminStudents,
    deleteStudent,
    updateStudent 
} = require('../controllers/studentController');
const { 
    getCourses,
    createCourse
} = require('../controllers/courseController');

const classController = require('../controllers/classController');
const venueController = require('../controllers/venueController');
const staffController = require('../controllers/staffController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

//GET all Course
router.get('/course', getCourses)

//post a new Course
router.post('/course', createCourse)

//GET all work out
router.get('/student', getAdminStudents)

//get single Student
router.get('/student/:id', getStudent)

//post a new Student
router.post('/student', createStudent)

//delete a new Student
router.delete('/student/:id', deleteStudent)

//update a new Student
router.patch('/student/:id', updateStudent)



// Define staff routes
router.get('/staff', staffController.getAllStaff);
router.get('/staff/:id', staffController.getStaffById);
router.post('/staff', staffController.createStaff);
router.patch('/staff/:id', staffController.updateStaff);
router.delete('/staff/:id', staffController.deleteStaff);


// Define venue routes
router.get('/venue', venueController.getAllVenue);
router.get('/venue/:id', venueController.getVenueById);
router.post('/venue', venueController.createVenue);
router.patch('/venue/:id', venueController.updateVenue);
router.delete('/venue/:id', venueController.deleteVenue);

// Define class routes
router.get('/class', classController.getAllClasses);
router.get('/class/:id', classController.getClassById);
router.post('/class', classController.createClass);
router.patch('/class/:id', classController.updateClass);
router.delete('/class/:id', classController.deleteClass);


module.exports = router;
