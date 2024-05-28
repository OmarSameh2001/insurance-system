const express = require('express');
const policyController = require('../controllers/policyController');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/', policyController.createPolicy);
router.get('/',adminMiddleware, policyController.getPolicies);
router.get('/:id', policyController.getPolicy);
router.put('/:id',adminMiddleware, policyController.updatePolicy);
router.delete('/:id',adminMiddleware, policyController.deletePolicy);

module.exports = router;
