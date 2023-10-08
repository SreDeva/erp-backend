const express = require('express');
const router = express.Router();
const venueController = require('../controllers/venueController');

// Define venue routes
router.get('/', venueController.getAllVenue);
router.get('/:id', venueController.getVenueById);
router.post('/', venueController.createVenue);
router.put('/:id', venueController.updateVenue);
router.delete('/:id', venueController.deleteVenue);

module.exports = router;

