const express = require('express');
const router = express.Router();
const interactionController = require('../controllers/interactionController');


router.post('/', interactionController.createInteraction);


router.get('/', interactionController.getInteractions);


router.get('/:interaction_id', interactionController.getInteractionById);


router.put('/:interaction_id', interactionController.updateInteractionById);


router.delete('/:interaction_id', interactionController.deleteInteractionById);

module.exports = router;
