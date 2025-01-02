const express = require('express');
const router = express.Router();
const leadController = require('../controllers/restaurantController');


router.post('/', leadController.createRestaurant);


router.get('/', leadController.getAllRestaurants);
router.get('/stats', leadController.getAllLeadsData);

router.get('/:lead_id', leadController.getRestaurantById);

router.get('/:lead_status', leadController.getRestaurantsByLeadStatus);


// router.put('/:lead_id', leadController.updateLeadById);


// router.delete('/:lead_id', leadController.deleteLeadById);

module.exports = router;
