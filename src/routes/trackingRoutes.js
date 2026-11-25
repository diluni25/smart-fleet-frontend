const express = require('express');
const {
  recordGpsUpdate,
  getTripTracking,
  getTripTrackingHistory,
} = require('../controllers/trackingController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);

router.post('/gps', authorize('driver', 'system_admin'), recordGpsUpdate);
router.get(
  '/trips/:tripId',
  authorize('system_admin', 'store_manager', 'store_employee', 'driver'),
  getTripTracking
);
router.get(
  '/trips/:tripId/history',
  authorize('system_admin', 'store_manager', 'store_employee', 'driver'),
  getTripTrackingHistory
);

module.exports = router;