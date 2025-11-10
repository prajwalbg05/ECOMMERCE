# Quick Start Guide

This guide will help you quickly set up and understand the E-Commerce application architecture.

## 📋 Prerequisites Checklist

- [ ] Node.js (v16+) installed
- [ ] MongoDB Atlas account created
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

## 🚀 Setup Steps

### 1. MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (M0)
3. Create database user
4. Whitelist IP address (0.0.0.0/0 for development)
5. Get connection string

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=your-connection-string
JWT_SECRET=your-secret-key
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

Start server:
```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start development server:
```bash
npm start
```

## 📁 Project Structure Overview

```
deligient/
├── frontend/     # React.js application
├── backend/      # Node.js + Express.js API
├── docs/         # API documentation
└── ARCHITECTURE.md  # Complete architecture docs
```

## 🔑 Key Concepts

### Authentication Flow
1. User registers/logs in
2. Backend returns JWT token
3. Frontend stores token
4. Token sent in Authorization header for protected routes

### State Management
- **AuthContext**: User authentication state
- **CartContext**: Shopping cart state
- **ProductContext**: Product list state (optional)

### API Flow
```
Frontend → API Service → Backend Route → Controller → Service → Database
                                                              ↓
Frontend ← API Service ← Backend Route ← Controller ← Service ← Database
```

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Complete architecture documentation
- **[FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md)** - Detailed folder structure
- **[docs/API.md](./docs/API.md)** - API endpoint documentation
- **[README.md](./README.md)** - Project overview

## 🛠️ Development Workflow

1. **Backend Development**
   - Add routes in `backend/src/routes/`
   - Create controllers in `backend/src/controllers/`
   - Implement services in `backend/src/services/`
   - Define models in `backend/src/models/`

2. **Frontend Development**
   - Create components in `frontend/src/components/`
   - Add pages in `frontend/src/pages/`
   - Update context in `frontend/src/context/`
   - Add API services in `frontend/src/services/`

## 🧪 Testing API Endpoints

Use Postman or curl to test endpoints:

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get products
curl http://localhost:5000/api/products
```

## 🚢 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

### Backend (Render)
1. Push to GitHub
2. Create Web Service on Render
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
- Already cloud-hosted
- Update connection string for production

## 📖 Next Steps

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture
2. Review [docs/API.md](./docs/API.md) for API endpoints
3. Start implementing features following the structure
4. Set up testing and error handling
5. Deploy to production

## 🆘 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify environment variables
- Check if port 5000 is available

### Frontend can't connect to backend
- Verify backend is running
- Check CORS settings
- Verify API URL in frontend .env

### Authentication not working
- Check JWT_SECRET is set
- Verify token is being sent in headers
- Check token expiration

## 📞 Support

For questions or issues:
1. Review the architecture documentation
2. Check API documentation
3. Review error logs
4. Check MongoDB Atlas connection

---

Happy Coding! 🎉

