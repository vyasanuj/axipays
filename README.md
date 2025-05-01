# Payment Flow System

A full-stack MERN application that simulates a real-world payment flow with server-to-server and iframe integration options.

## Features

- Server-to-Server (S2S) payment integration
- Iframe payment integration
- Real-time transaction status updates
- Card number validation using Luhn algorithm
- Secure handling of sensitive card data
- Beautiful UI with smooth animations
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Project Structure

```
payment-flow-system/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── utils/        # Utility functions
│   │   └── ...
│   └── ...
├── server/                # Backend Express application
│   ├── controllers/      # Route controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   ├── utils/           # Utility functions
│   └── ...
└── ...
```

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd payment-flow-system
```

2. Install dependencies:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/payment-flow-system
VANCIPAY_API_URL=https://api.vancipay.com/pay
NODE_ENV=development
```

4. Start the development servers:

In the server directory:
```bash
npm run dev
```

In the client directory:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## API Endpoints

### POST /api/payments/s2s
Process a server-to-server payment

### POST /api/payments/update-status
Update transaction status

### GET /api/transactions
Get all transactions

## Security Considerations

- Card data is masked before storage
- Sensitive data is only transmitted to the payment API
- CORS is properly configured
- Input validation is implemented
- Secure communication with the iframe

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 