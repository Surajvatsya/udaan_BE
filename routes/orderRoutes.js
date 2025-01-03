const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


router.post('/', orderController.createOrder);

router.get('/trends', orderController.getOrderTrends);

router.get('/heatmap/:restaurant_id', orderController.getOrdersCountAndDateByRId);
router.get('/stats', orderController.getOrderStats);

router.get('/:restaurant_id', orderController.getOrdersByRId);




router.get('/:order_id', orderController.getOrderById);





// router.put('/:lead_id', orderController.updateLeadById);


// router.delete('/:lead_id', orderController.deleteLeadById);

module.exports = router;
