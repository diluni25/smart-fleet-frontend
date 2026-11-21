const router = require('express').Router();
const controller = require('../controllers/dashboardController');
const asyncHandler = require('../middleware/asyncHandler');

router.get('/kpis', asyncHandler(controller.getKpis));
router.get('/activity', asyncHandler(controller.getActivity));

module.exports = router;
