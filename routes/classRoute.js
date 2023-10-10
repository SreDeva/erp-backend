// classRoutes.js
const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// Define class routes
router.get('/class', classController.getAllClasses);
router.get('/class/className', classController.getClassById);
router.post('/class', classController.createClass);
router.patch('/class/:id', classController.updateClass);
router.delete('/class/:id', classController.deleteClass);
router.put('/class/add_student', classController.addStudent)
router.put('/class/add_course', classController.addCourse)
router.put('/class/deleteStudent', classController.deleteStudent)
router.put('/class/deleteCourse', classController.deleteCourse)
router.put('/class/updateCourseStaff', classController.updateCourseStaff)
router.put('/class/updateCourseVenue', classController.updateCourseVenue)


module.exports = router;
