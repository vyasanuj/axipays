import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import CheckoutForm from '../components/CheckoutForm';
import IframeForm from '../components/IframeForm';

const socket = io(
  import.meta.env.PROD
    ? 'https://axipays.onrender.com'
    : 'http://localhost:5000'
);

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('s2s');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Listen for transaction updates
    socket.on('transaction-update', (data) => {
      const { status } = data;
      toast[status === 'Success' ? 'success' : 'error'](
        `Transaction ${status.toLowerCase()}`
      );
    });

    return () => {
      socket.off('transaction-update');
    };
  }, []);

  const handleS2SSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post('https://axipays.onrender.com/api/payments/s2s', formData);
      
      if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      } else {
        toast.success('Payment processed successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Payment processing failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">Payment Checkout</h2>
          
          <div className="mt-4">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setPaymentMethod('s2s')}
                className={`px-4 py-2 rounded-md ${
                  paymentMethod === 's2s'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Server to Server
              </button>
              <button
                onClick={() => setPaymentMethod('iframe')}
                className={`px-4 py-2 rounded-md ${
                  paymentMethod === 'iframe'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Iframe Integration
              </button>
            </div>

            {paymentMethod === 's2s' ? (
              <CheckoutForm onSubmit={handleS2SSubmit} loading={loading} />
            ) : (
              <IframeForm />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout; 