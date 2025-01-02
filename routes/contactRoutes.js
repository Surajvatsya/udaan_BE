const express = require('express');
const router = express.Router();
const contactController = require('../controllers/pointOfContactController');


router.post('/', contactController.createPointOfContact);


router.get('/:rId', contactController.getAllPointsOfContactByRId);


router.get('/:contact_id', contactController.getPointOfContactById);


// router.put('/:contact_id', contactController.updateContactById);


// router.delete('/:contact_id', contactController.deleteContactById);

module.exports = router;
