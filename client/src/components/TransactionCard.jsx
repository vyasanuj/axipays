function TransactionCard({ transaction }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Success':
        return 'bg-green-100 text-green-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-md">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">
            Order ID: {transaction.orderId}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
              transaction.status
            )}`}
          >
            {transaction.status}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500">Cardholder Name</label>
            <p className="text-sm font-medium text-gray-900">
              {transaction.cardHolderName}
            </p>
          </div>

          <div>
            <label className="text-xs text-gray-500">Card Number</label>
            <p className="text-sm font-medium text-gray-900">
              {transaction.maskedCardNumber}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500">Expiry</label>
              <p className="text-sm font-medium text-gray-900">
                {transaction.expiryMonth}/{transaction.expiryYear}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500">CVV</label>
              <p className="text-sm font-medium text-gray-900">
                {transaction.maskedCVC}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500">Amount</label>
              <p className="text-sm font-medium text-gray-900">
                {transaction.amount.toFixed(2)}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500">Currency</label>
              <p className="text-sm font-medium text-gray-900">
                {transaction.currency}
              </p>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500">Date</label>
            <p className="text-sm font-medium text-gray-900">
              {formatDate(transaction.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionCard; 