const router = require('express').Router();
const controller = require('../controllers/vehicleController');
const asyncHandler = require('../middleware/asyncHandler');

router.route('/')
  .get(asyncHandler(controller.getVehicles))
  .post(asyncHandler(controller.createVehicle));

router.route('/:id')
  .get(asyncHandler(controller.getVehicle))
  .put(asyncHandler(controller.updateVehicle))
  .delete(asyncHandler(controller.deleteVehicle));

module.exports = router;
