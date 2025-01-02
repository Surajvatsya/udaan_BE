const express = require('express');
const router = express.Router();
const interactionController = require('../controllers/interactionController');


router.post('/', interactionController.createInteraction);


router.get('/all', interactionController.getAllInteractions);
router.get('/today', interactionController.todayFollowup);


// router.get('/:interaction_id', interactionController.getInteractionById);
router.get('/:restaurant_id', interactionController.getInteractionByRestaureantId);
router.get('/', interactionController.getAllCalls);




// router.put('/:interaction_id', interactionController.updateInteractionById);


// router.delete('/:interaction_id', interactionController.deleteInteractionById);


module.exports = router;
