const express = require('express');
const router = express.Router();
const contactController = require('../controllers/pointOfContactController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/', authMiddleware, contactController.createPointOfContact);


router.get('/:rId', authMiddleware, contactController.getAllPointsOfContactByRId);


router.get('/:contact_id', authMiddleware, contactController.getPointOfContactById);


// router.put('/:contact_id', contactController.updateContactById);


// router.delete('/:contact_id', contactController.deleteContactById);

module.exports = router;
