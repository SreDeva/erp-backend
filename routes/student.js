const express = require('express');
const { 
    createStudent,
    getStudent,
    getStudents,
    deleteStudent,
    updateStudent 
} = require('../controllers/studentController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

//GET all work out
router.get('/', getStudents)

//get single Student
router.get('/:id', getStudent)

//post a new Student
router.post('/', createStudent)

//delete a new Student
router.delete('/:id', deleteStudent)

//update a new Student
router.patch('/:id', updateStudent)

module.exports = router