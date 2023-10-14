const express = require('express');
const router = express.Router();
const attendaceController = require('../controllers/attendanceController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.get('/', attendaceController.getAllAttendace);
router.get('/byuser', attendaceController.getAttendanceByUser);
router.get('/date', attendaceController.getAttendanceByDate)
router.post('/', attendaceController.postAttendance);

module.exports = router;