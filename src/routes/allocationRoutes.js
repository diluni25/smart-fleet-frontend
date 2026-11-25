const express = require('express');
const {
  createVehicle,
  getVehicles,
  recommendVehicles,
  assignVehicleToTrip,
} = require('../controllers/allocationController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);

router.get('/vehicles', getVehicles);
router.post('/vehicles', authorize('system_admin'), createVehicle);
router.post('/recommend', authorize('system_admin', 'store_manager'), recommendVehicles);
router.post('/assign', authorize('system_admin', 'store_manager'), assignVehicleToTrip);

module.exports = router;