const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Process S2S payment
router.post('/s2s', paymentController.processS2SPayment);

// Update transaction status
router.post('/update-status', paymentController.updateTransactionStatus);

module.exports = router; 