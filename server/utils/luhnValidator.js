/**
 * Validates a card number using the Luhn algorithm
 * @param {string} cardNumber - The card number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function luhnCheck(cardNumber) {
  if (!cardNumber || typeof cardNumber !== 'string') {
    return false;
  }

  // Remove any spaces or dashes
  cardNumber = cardNumber.replace(/[\s-]/g, '');

  if (!/^\d+$/.test(cardNumber)) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  // Loop through values starting from the rightmost digit
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

module.exports = luhnCheck; 