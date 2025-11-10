# Backend Quick Start Guide

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Create `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=your-mongodb-atlas-connection-string
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 3. Seed Sample Data
```bash
npm run seed
```

### 4. Start Server
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Cart
- `GET /api/cart?userId=guest` - Get user cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear cart

## 🧪 Test the API

### Using cURL

```bash
# Get all products
curl http://localhost:5000/api/products

# Get product by ID (replace PRODUCT_ID)
curl http://localhost:5000/api/products/PRODUCT_ID

# Add to cart
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"userId":"guest","productId":"PRODUCT_ID","quantity":1}'

# Get cart
curl http://localhost:5000/api/cart?userId=guest

# Remove from cart (replace ITEM_ID)
curl -X DELETE http://localhost:5000/api/cart/ITEM_ID \
  -H "Content-Type: application/json" \
  -d '{"userId":"guest"}'
```

### Using Postman
1. Import the API endpoints
2. Set base URL: `http://localhost:5000/api`
3. Test each endpoint

## 🔍 Health Check
```bash
curl http://localhost:5000/health
```

## 📝 Notes

- Default userId is "guest" if not provided
- MongoDB Atlas connection string required
- CORS is configured for frontend
- All errors return JSON format
- Sample data includes 12 products

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Check MongoDB Atlas connection string
- Verify IP address is whitelisted
- Check database user credentials

### Port Already in Use
- Change PORT in .env file
- Or kill the process using port 5000

### Module Not Found
- Run `npm install` again
- Check node_modules directory exists

## 📚 Documentation

See [README.md](./README.md) for detailed documentation.

