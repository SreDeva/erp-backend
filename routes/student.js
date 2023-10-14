const express = require('express');
const { 
    createStudent,
    getStudent,
    getStudents,
    deleteStudent,
    updateStudent ,
    getAdminStudents
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

router.get('/byuser', getStudents)

//GET all work out
router.get('/', getAdminStudents)

//get single Student
router.get('/:id', getStudent)

//post a new Student
router.post('/', createStudent)

//delete a new Student
router.delete('/:id', deleteStudent)

//update a new Student
router.patch('/:id', updateStudent)


module.exports = router