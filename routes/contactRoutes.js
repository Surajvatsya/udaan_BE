const express = require("express");
const router = express.Router();
const contactController = require("../controllers/pointOfContactController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, contactController.createPointOfContact);

router.get(
  "/:rId",
  authMiddleware,
  contactController.getAllPointsOfContactByRId,
);

module.exports = router;
