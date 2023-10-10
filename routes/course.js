const express = require('express');
const { 
    getCourses,
    createCourse
} = require('../controllers/courseController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

//GET all Course
router.get('/course', getCourses)

//get single Course
// router.get('/:Class', getCourse)

//post a new Course
router.post('/course', createCourse)

// //delete a new Course
// router.delete('/:id', deleteCourse)

// //update a new Course
// router.patch('/:id', updateCourse)

module.exports = router