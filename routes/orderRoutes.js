const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, orderController.createOrder);

router.get("/trends", authMiddleware, orderController.getOrderTrends);

router.get(
  "/heatmap/:restaurant_id",
  authMiddleware,
  orderController.getOrdersCountAndDateByRId,
);
router.get("/stats", authMiddleware, orderController.getOrderStats);

router.get("/:restaurant_id", authMiddleware, orderController.getOrdersByRId);

router.get("/get/:order_id", authMiddleware, orderController.getOrderById);


module.exports = router;
