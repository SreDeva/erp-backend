const express = require('express');
const { 
    createStudent,
    getStudent,
    getStudents,
    deleteStudent,
    updateStudent 
} = require('../controllers/studentController');
// const { 
//     getCourses,
// } = require('../controllers/courseController');

const classController = require('../controllers/classController');
// const venueController = require('../controllers/venueController');
// const staffController = require('../controllers/staffController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

//GET all work out
router.get('/student', getStudents)

//get single Student
router.get('/student/:id', getStudent)

//post a new Student
router.post('/student', createStudent)

//delete a new Student
router.delete('/student/:id', deleteStudent)

//update a new Student
router.patch('/student/:id', updateStudent)

router.get('/class/className', classController.getClassById);

module.exports = router