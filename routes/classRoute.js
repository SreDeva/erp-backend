// classRoutes.js
const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

// Define class routes
router.get('/', classController.getAllClasses);
router.get('/className', classController.getClassById);
router.post('/', classController.createClass);
router.patch('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);
router.put('/add_student', classController.addStudent)
router.put('/add_course', classController.addCourse)
router.put('/deleteStudent', classController.deleteStudent)
router.put('/deleteCourse', classController.deleteCourse)
router.put('/updateCourseStaff', classController.updateCourseStaff)
router.put('/updateCourseVenue', classController.updateCourseVenue)


module.exports = router;
