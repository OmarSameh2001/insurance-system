const express = require('express');
const authController = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

router.post('/register', [
  body('name').isString().notEmpty(),
  body('phone').isString().isLength({ min: 10, max: 15 }),  // Adjust length based on your requirements
  body('password').isString().isLength({ min: 6 })
], authController.register);
router.post('/login', authController.login);
router.post('/brokerLogin', authController.brokerLogin)

module.exports = router;

