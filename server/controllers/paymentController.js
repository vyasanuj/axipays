const axios = require('axios');
const Transaction = require('../models/Transaction');
const { maskCardNumber, maskCVV, generateOrderId } = require('../utils/maskCardData');
const luhnCheck = require('../utils/luhnValidator');

// Default API URL if environment variable is not set
const VANCIPAY_API_URL = process.env.VANCIPAY_API_URL || 'https://api.vancipay.com/pay';

/**
 * Process server-to-server payment
 */
exports.processS2SPayment = async (req, res) => {
  const io = req.app.get('io');
  let transaction = null; // Move transaction declaration to the top
  
  try {
    // Validate card number using Luhn algorithm
    if (!luhnCheck(req.body.cardNumber)) {
      return res.status(400).json({ message: 'Invalid card number' });
    }

    const orderId = generateOrderId();
    console.log('Generated Order ID:', orderId);
    
    // Create transaction record with masked data
    transaction = new Transaction({
      orderId,
      cardHolderName: req.body.cardHolderName,
      maskedCardNumber: maskCardNumber(req.body.cardNumber),
      expiryMonth: req.body.expiryMonth,
      expiryYear: req.body.expiryYear,
      maskedCVC: maskCVV(req.body.cardCVC),
      amount: req.body.amount,
      currency: req.body.currency,
      status: 'Pending'
    });

    await transaction.save();

    // Make payment request to Vancipay API
    const response = await axios.post(VANCIPAY_API_URL, {
      orderId,
      cardHolderName: req.body.cardHolderName,
      cardNumber: req.body.cardNumber,
      expiryMonth: req.body.expiryMonth,
      expiryYear: req.body.expiryYear,
      cardCVC: req.body.cardCVC,
      amount: req.body.amount,
      currency: req.body.currency
    });

    // Update transaction status based on API response
    transaction.status = response.data.status || 'Success';
    await transaction.save();

    // Emit real-time update
    io.emit('transaction-update', {
      orderId: transaction.orderId,
      status: transaction.status
    });

    res.json({
      orderId: transaction.orderId,
      status: transaction.status,
      redirectUrl: response.data.redirectUrl
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    
    // Update transaction status to Failed if it exists
    if (transaction) {
      transaction.status = 'Failed';
      await transaction.save();
      
      io.emit('transaction-update', {
        orderId: transaction.orderId,
        status: 'Failed'
      });
    }

    res.status(500).json({ message: 'Payment processing failed' });
  }
};

/**
 * Update transaction status
 */
exports.updateTransactionStatus = async (req, res) => {
  const { orderId, status } = req.body;
  const io = req.app.get('io');

  try {
    const transaction = await Transaction.findOne({ orderId });
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    transaction.status = status;
    await transaction.save();

    // Emit real-time update
    io.emit('transaction-update', {
      orderId,
      status
    });

    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({ message: 'Status update failed' });
  }
};

/**
 * Get all transactions
 */
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .select('-__v');
    
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
}; 