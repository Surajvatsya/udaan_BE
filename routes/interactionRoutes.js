const express = require("express");
const router = express.Router();
const interactionController = require("../controllers/interactionController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, interactionController.createInteraction);
router.get("/", authMiddleware, interactionController.getAllCalls);
router.get("/all", authMiddleware, interactionController.getAllInteractions);
router.get("/today", authMiddleware, interactionController.todayFollowup);
router.get(
  "/:restaurant_id",
  authMiddleware,
  interactionController.getInteractionByRestaureantId,
);

module.exports = router;
