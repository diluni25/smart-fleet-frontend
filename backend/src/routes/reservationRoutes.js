const router = require('express').Router();
const controller = require('../controllers/reservationController');
const asyncHandler = require('../middleware/asyncHandler');

router.route('/')
  .get(asyncHandler(controller.getReservations))
  .post(asyncHandler(controller.createReservation));

router.route('/schedule')
  .get(asyncHandler(controller.getSchedule));

router.route('/:id')
  .get(asyncHandler(controller.getReservation))
  .put(asyncHandler(controller.updateReservation))
  .delete(asyncHandler(controller.deleteReservation));

module.exports = router;
