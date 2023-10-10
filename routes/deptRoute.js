const express = require('express');
const router = express.Router();
const deptController = require('../controllers/deptController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

// Define dept routes
router.get('/', deptController.getAllDeptes);
router.get('/:id', deptController.getDeptById);
router.post('/', deptController.createDept);
router.put('/:id', deptController.updateDept);
router.delete('/:id', deptController.deleteDept);

module.exports = router;

