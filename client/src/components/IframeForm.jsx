import { useEffect, useRef } from 'react';
import { generateOrderId } from '../utils/helpers';

function IframeForm() {
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleMessage = (event) => {
      // Verify origin for security
      if (event.origin !== 'https://celalios.com') {
        return;
      }

      // Handle payment response
      const { status, orderId } = event.data;
      console.log('Payment status:', status, 'Order ID:', orderId);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    // Send initial data to iframe
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
      }
    };

    // Wait for iframe to load
    if (iframeRef.current) {
      iframeRef.current.onload = sendDataToIframe;
    }
  }, []);

  return (
    <div className="relative h-[600px] w-full">
      <iframe
        ref={iframeRef}
        src="https://celalios.com/"
        className="absolute inset-0 w-full h-full border-0 rounded-md"
        title="Payment Form"
      />
    </div>
  );
}

export default IframeForm; 