const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Get all transactions
router.get('/', paymentController.getTransactions);

module.exports = router; 