const express = require("express");
const router = express.Router();
const leadController = require("../controllers/restaurantController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, leadController.createRestaurant);
router.get("/", authMiddleware, leadController.getAllRestaurants);
router.get(
  "/revenue_contribution",
  authMiddleware,
  leadController.getRevenueContribution,
);
router.get("/stats", authMiddleware, leadController.getAllLeadsData);
router.get("/data", authMiddleware, leadController.getRestaurantStats);
router.get("/perf", authMiddleware, leadController.getAccountPerformanceStats);
router.get("/:lead_id", authMiddleware, leadController.getRestaurantById);
router.get(
  "/status/:lead_status",
  authMiddleware,
  leadController.getRestaurantsByLeadStatus,
);

module.exports = router;
