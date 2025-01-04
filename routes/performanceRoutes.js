const express = require('express');
const router = express.Router();
const interactionController = require('../controllers/interactionController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/', authMiddleware, interactionController.createInteraction);


router.get('/', authMiddleware, interactionController.getInteractions);


router.get('/:interaction_id', authMiddleware, interactionController.getInteractionById);


router.put('/:interaction_id', authMiddleware, interactionController.updateInteractionById);


router.delete('/:interaction_id', authMiddleware, interactionController.deleteInteractionById);

module.exports = router;
