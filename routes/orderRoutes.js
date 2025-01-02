const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


router.post('/', orderController.createOrder);


router.get('/heatmap/:restaurant_id', orderController.getOrdersCountAndDateByRId);
router.get('/:restaurant_id', orderController.getOrdersByRId);





router.get('/:order_id', orderController.getOrderById);



// router.get('/:lead_status', orderController.getRestaurantsByLeadStatus);


// router.put('/:lead_id', orderController.updateLeadById);


// router.delete('/:lead_id', orderController.deleteLeadById);

module.exports = router;
