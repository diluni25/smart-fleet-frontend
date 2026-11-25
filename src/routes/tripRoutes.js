const express = require('express');
const {
  createTrip,
  getTrips,
  getTripById,
  reorderTripSequence,
} = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', getTrips);
router.get('/:id', getTripById);
router.post('/', authorize('system_admin', 'store_manager'), createTrip);
router.patch('/:id/sequence', authorize('system_admin', 'store_manager'), reorderTripSequence);

module.exports = router;