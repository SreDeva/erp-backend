const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

// Define staff routes
router.get('/', staffController.getAllStaff);
router.get('/:id', staffController.getStaffById);
router.post('/', staffController.createStaff);
router.put('/:id', staffController.updateStaff);
router.delete('/:id', staffController.deleteStaff);

module.exports = router;

