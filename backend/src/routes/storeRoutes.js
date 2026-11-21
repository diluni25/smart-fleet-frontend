const router = require('express').Router();
const controller = require('../controllers/storeController');
const asyncHandler = require('../middleware/asyncHandler');

router.route('/')
  .get(asyncHandler(controller.getStores))
  .post(asyncHandler(controller.createStore));

router.patch('/:id/operating-hours', asyncHandler(controller.updateOperatingHours));
router.patch('/:id/loading-slot-rules', asyncHandler(controller.updateLoadingSlotRules));

router.route('/:id')
  .get(asyncHandler(controller.getStore))
  .put(asyncHandler(controller.updateStore))
  .delete(asyncHandler(controller.deleteStore));

module.exports = router;
