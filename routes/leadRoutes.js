const express = require('express');
const router = express.Router();
const leadController = require('../controllers/restaurantController');

// Specific routes should come before parameterized routes
router.get('/revenue_contribution', leadController.getRevenueContribution);
router.post('/', leadController.createRestaurant);
router.get('/stats', leadController.getAllLeadsData);
router.get('/data', leadController.getRestaurantStats);
router.get('/perf', leadController.getAccountPerformanceStats);
router.get('/', leadController.getAllRestaurants);
router.get('/:lead_id', leadController.getRestaurantById);
router.get('/status/:lead_status', leadController.getRestaurantsByLeadStatus);

module.exports = router;
