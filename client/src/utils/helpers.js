/**
 * Generates a random order ID
 * @returns {string} A random order ID
 */
export function generateOrderId() {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

/**
 * Formats a card number with spaces
 * @param {string} cardNumber - The card number to format
 * @returns {string} The formatted card number
 */
export function formatCardNumber(cardNumber) {
  if (!cardNumber) return '';
  return cardNumber.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || cardNumber;
}

/**
 * Validates a card number using the Luhn algorithm
 * @param {string} cardNumber - The card number to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function luhnCheck(cardNumber) {
  if (!cardNumber) return false;
  
  // Remove any spaces or dashes
  cardNumber = cardNumber.replace(/[\s-]/g, '');
  
  if (!/^\d+$/.test(cardNumber)) return false;
  
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

/**
 * Formats a date string to a locale string
 * @param {string} dateString - The date string to format
 * @returns {string} The formatted date string
 */
export function formatDate(dateString) {
  return new Date(dateString).toLocaleString();
}

/**
 * Gets the appropriate color class for a transaction status
 * @param {string} status - The transaction status
 * @returns {string} The Tailwind CSS color classes
 */
export function getStatusColor(status) {
  switch (status) {
    case 'Success':
      return 'bg-green-100 text-green-800';
    case 'Failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-yellow-100 text-yellow-800';
  }
} 