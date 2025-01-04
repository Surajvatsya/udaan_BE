const express = require('express');
const router = express.Router();
const interactionController = require('../controllers/interactionController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/', authMiddleware, interactionController.createInteraction);


router.get('/all', authMiddleware, interactionController.getAllInteractions);
router.get('/today', authMiddleware, interactionController.todayFollowup);


// router.get('/:interaction_id', interactionController.getInteractionById);
router.get('/:restaurant_id',authMiddleware,  interactionController.getInteractionByRestaureantId);
router.get('/',authMiddleware, interactionController.getAllCalls);




// router.put('/:interaction_id', interactionController.updateInteractionById);


// router.delete('/:interaction_id', interactionController.deleteInteractionById);


module.exports = router;
