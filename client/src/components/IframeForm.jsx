import { useEffect, useRef, useState } from 'react';
import { generateOrderId } from '../utils/helpers';
import toast from 'react-hot-toast';
import { CreditCard, Lock, AlertCircle, ShieldCheck } from 'lucide-react';

function IframeForm() {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== 'https://celalios.com') return;

      const { status, orderId } = event.data;
      console.log('Payment status:', status, 'Order ID:', orderId);
      
      if (status === 'success') {
        toast.success('Payment completed successfully!');
      } else if (status === 'error') {
        toast.error('Payment failed. Please try again.');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    const sendDataToIframe = () => {
      if (iframeRef.current) {
        const data = {
          orderId: generateOrderId(),
          cardholder: '',
          cardNumber: '',
          expiryDate: '',
          cvc: '',
          amount: '',
          currency: '',
          showForm: 1
        };

        iframeRef.current.contentWindow.postMessage(data, 'https://celalios.com');
        setIsLoading(false);
      }
    };

    if (iframeRef.current) {
      iframeRef.current.onload = sendDataToIframe;
    }
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] max-h-[1000px] min-h-[750px] flex flex-col bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex-none py-2 px-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Secure Payment</h3>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-600">Protected Payment</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-3 overflow-hidden">
        <div className="relative h-full rounded-lg bg-white shadow-md">
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-lg">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                <p className="text-sm text-gray-600">Securing connection...</p>
              </div>
            </div>
          )}

          <iframe
            ref={iframeRef}
            src="https://celalios.com/"
            className="w-full h-full border-0 rounded-lg"
            style={{ 
              overflow: 'hidden',
              minHeight: '650px',
              height: '100%'
            }}
            scrolling="no"
            title="Secure Payment Form"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex-none py-2 px-4 border-t border-gray-100 bg-white/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">End-to-end encryption</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-500">Visa</span>
            </div>
            <div className="flex items-center space-x-1">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-500">Mastercard</span>
            </div>
            <div className="flex items-center space-x-1">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-500">Amex</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IframeForm; 