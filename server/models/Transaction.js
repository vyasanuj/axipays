const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  cardHolderName: {
    type: String,
    required: true
  },
  maskedCardNumber: {
    type: String,
    required: true
  },
  expiryMonth: {
    type: String,
    required: true
  },
  expiryYear: {
    type: String,
    required: true
  },
  maskedCVC: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'GBP'] // Add more currencies as needed
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Success', 'Failed'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
transactionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Transaction', transactionSchema); 