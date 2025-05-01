import { useState } from 'react';
import toast from 'react-hot-toast';

function luhnCheck(cardNumber) {
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

function CheckoutForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    cardHolderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cardCVC: '',
    amount: '',
    currency: 'USD'
  });

  const [focused, setFocused] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || value;
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate card number using Luhn algorithm
    const cardNumber = formData.cardNumber.replace(/\s/g, '');
    if (!luhnCheck(cardNumber)) {
      toast.error('Invalid card number');
      return;
    }
    
    // Basic validations
    if (formData.cardCVC.length < 3) {
      toast.error('Invalid CVV/CVC');
      return;
    }
    
    if (!formData.expiryMonth || !formData.expiryYear) {
      toast.error('Invalid expiry date');
      return;
    }
    
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Invalid amount');
      return;
    }
    
    onSubmit({
      ...formData,
      cardNumber,
      amount
    });
  };

  const inputClasses = (name) => `
    mt-1 block w-full rounded-lg border-gray-300 bg-white/50 backdrop-blur-sm
    shadow-sm transition-all duration-200 ease-in-out
    ${focused === name ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-lg' : 'hover:border-gray-400'}
    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
  `;

  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Card Information</h3>
        <div className="space-y-6">
          <div className="transform transition-all duration-200 hover:translate-x-1">
            <label className={labelClasses}>
              Cardholder Name
            </label>
            <input
              type="text"
              name="cardHolderName"
              value={formData.cardHolderName}
              onChange={handleChange}
              onFocus={() => setFocused('cardHolderName')}
              onBlur={() => setFocused('')}
              required
              className={inputClasses('cardHolderName')}
              placeholder="John Doe"
            />
          </div>

          <div className="transform transition-all duration-200 hover:translate-x-1">
            <label className={labelClasses}>
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              onFocus={() => setFocused('cardNumber')}
              onBlur={() => setFocused('')}
              required
              maxLength="19"
              className={inputClasses('cardNumber')}
              placeholder="4111 1111 1111 1111"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className={`${labelClasses} text-gray-700`}>
                Card Expiry
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="transform transition-all duration-200 hover:translate-x-1">
                  <label className={`${labelClasses} text-xs text-gray-500`}>
                    Month
                  </label>
                  <select
                    name="expiryMonth"
                    value={formData.expiryMonth}
                    onChange={handleChange}
                    onFocus={() => setFocused('expiryMonth')}
                    onBlur={() => setFocused('')}
                    required
                    className={inputClasses('expiryMonth')}
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = (i + 1).toString().padStart(2, '0');
                      return (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="transform transition-all duration-200 hover:translate-x-1">
                  <label className={`${labelClasses} text-xs text-gray-500`}>
                    Year
                  </label>
                  <select
                    name="expiryYear"
                    value={formData.expiryYear}
                    onChange={handleChange}
                    onFocus={() => setFocused('expiryYear')}
                    onBlur={() => setFocused('')}
                    required
                    className={inputClasses('expiryYear')}
                  >
                    <option value="">YYYY</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = (new Date().getFullYear() + i).toString();
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className={`${labelClasses} text-gray-700`}>
                Security Code
              </label>
              <div className="transform transition-all duration-200 hover:translate-x-1">
                <label className={`${labelClasses} text-xs text-gray-500`}>
                  CVV
                </label>
                <input
                  type="password"
                  name="cardCVC"
                  value={formData.cardCVC}
                  onChange={handleChange}
                  onFocus={() => setFocused('cardCVC')}
                  onBlur={() => setFocused('')}
                  required
                  maxLength="4"
                  className={inputClasses('cardCVC')}
                  placeholder="123"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="transform transition-all duration-200 hover:translate-x-1">
            <label className={labelClasses}>
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              onFocus={() => setFocused('amount')}
              onBlur={() => setFocused('')}
              required
              min="0.01"
              step="0.01"
              className={inputClasses('amount')}
              placeholder="0.00"
            />
          </div>

          <div className="transform transition-all duration-200 hover:translate-x-1">
            <label className={labelClasses}>
              Currency
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              onFocus={() => setFocused('currency')}
              onBlur={() => setFocused('')}
              required
              className={inputClasses('currency')}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className={`
            w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
            text-sm font-semibold text-white
            transform transition-all duration-200
            ${loading 
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-0.5'
            }
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          `}
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              Processing Payment...
            </div>
          ) : (
            'Complete Payment'
          )}
        </button>
      </div>
    </form>
  );
}

export default CheckoutForm; 