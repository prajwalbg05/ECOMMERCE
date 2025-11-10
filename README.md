# E-Commerce Web Application

A modern full-stack E-Commerce web application built with React.js, Node.js, Express.js, and MongoDB Atlas.

## Features

- 🛍️ Product catalog with search and filtering
- 📱 Responsive design
- 🛒 Shopping cart management
- 👤 User authentication (Register/Login)
- 🔒 Secure JWT-based authentication
- 📦 Product details and reviews
- 🚀 Cloud deployment ready

## Tech Stack

### Frontend
- React.js
- React Router
- React Context API (State Management)
- Axios (API calls)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose (ODM)
- JWT (Authentication)
- bcrypt (Password Hashing)

### Deployment
- Frontend: Vercel/Netlify
- Backend: Render
- Database: MongoDB Atlas

## Project Structure

```
deligient/
├── frontend/          # React.js frontend application
├── backend/           # Node.js + Express.js backend
├── docs/              # Documentation
├── ARCHITECTURE.md    # Detailed architecture documentation
└── README.md          # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Git

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd deligient
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd ../backend
npm install
```

### Configuration

1. **Backend Environment Variables**
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

2. **Frontend Environment Variables**
   Create a `.env` file in the `frontend` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm start
   ```
   Server will run on `http://localhost:5000`

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   Application will open on `http://localhost:3000`

## Documentation

- [Architecture Documentation](./ARCHITECTURE.md)
- [API Documentation](./docs/API.md)

## Deployment

See [Deployment Strategy](./ARCHITECTURE.md#deployment-strategy) in the architecture documentation for detailed deployment instructions.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

