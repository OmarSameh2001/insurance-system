const express = require('express');
const brokerController = require('../controllers/brokerController');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/',adminMiddleware, brokerController.createBroker);
router.get('/',adminMiddleware, brokerController.getBrokers);
router.get('/:id', brokerController.getBroker);
router.put('/:id',adminMiddleware, brokerController.updateBroker);
router.delete('/:id',adminMiddleware, brokerController.deleteBroker);

module.exports = router;
