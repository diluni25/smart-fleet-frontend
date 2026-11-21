const router = require('express').Router();
const controller = require('../controllers/reservationController');
const asyncHandler = require('../middleware/asyncHandler');

router.get('/', asyncHandler(controller.getSchedule));

module.exports = router;
