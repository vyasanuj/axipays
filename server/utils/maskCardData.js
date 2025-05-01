/**
 * Masks a card number showing only the last 4 digits
 * @param {string} cardNumber - The card number to mask
 * @returns {string} - The masked card number
 */
function maskCardNumber(cardNumber) {
  if (!cardNumber || typeof cardNumber !== 'string') {
    return '';
  }
  
  // Remove any spaces or dashes
  cardNumber = cardNumber.replace(/[\s-]/g, '');
  
  // Keep only last 4 digits visible
  return cardNumber.slice(-4).padStart(cardNumber.length, '*');
}

/**
 * Masks a CVV/CVC number
 * @param {string} cvv - The CVV to mask
 * @returns {string} - The masked CVV
 */
function maskCVV(cvv) {
  if (!cvv || typeof cvv !== 'string') {
    return '';
  }
  return '*'.repeat(cvv.length);
}

/**
 * Generates a random order ID
 * @returns {string} - A random order ID
 */
function generateOrderId() {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

module.exports = {
  maskCardNumber,
  maskCVV,
  generateOrderId
}; 