import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import TransactionCard from '../components/TransactionCard';

const socket = io(
  import.meta.env.PROD
    ? 'https://axipays.onrender.com'
    : 'http://localhost:5000'
);

function Orders() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();

    // Listen for real-time updates
    socket.on('transaction-update', ({ orderId, status }) => {
      setTransactions(prevTransactions =>
        prevTransactions.map(transaction =>
          transaction.orderId === orderId
            ? { ...transaction, status }
            : transaction
        )
      );
    });

    return () => {
      socket.off('transaction-update');
    };
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Transaction History</h2>
      
      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No transactions found</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {transactions.map(transaction => (
            <TransactionCard
              key={transaction.orderId}
              transaction={transaction}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders; 