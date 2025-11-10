# E-Commerce Backend API

A Node.js + Express.js backend API for an E-Commerce application with MongoDB Atlas.

## Features

- 🛍️ Product management (list, get by ID)
- 🛒 Shopping cart management (add, remove, update, clear)
- 🗄️ MongoDB Atlas integration
- ✅ Error handling and validation
- 📊 Pagination and filtering
- 🔍 Product search functionality

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **dotenv** - Environment variables
- **CORS** - Cross-origin resource sharing

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
PORT=5000
MONGODB_URI=your-mongodb-atlas-connection-string
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

3. Seed sample data (optional):
```bash
npm run seed
```

4. Start server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Products

#### Get All Products
- **URL:** `GET /api/products`
- **Query Parameters:**
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
  - `category` (optional): Filter by category
  - `search` (optional): Search query
  - `sort` (optional): Sort field (default: createdAt)
  - `order` (optional): Sort order (asc/desc, default: desc)
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "products": [...],
      "pagination": {
        "currentPage": 1,
        "totalPages": 5,
        "totalProducts": 50,
        "hasNext": true,
        "hasPrev": false
      }
    }
  }
  ```

#### Get Product by ID
- **URL:** `GET /api/products/:id`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": "...",
      "name": "Product Name",
      "description": "...",
      "price": 99.99,
      ...
    }
  }
  ```

### Cart

#### Get User Cart
- **URL:** `GET /api/cart?userId=guest`
- **Query Parameters:**
  - `userId` (optional): User ID (default: "guest")
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "cartId": "...",
      "userId": "guest",
      "items": [...],
      "totalAmount": 99.99,
      "totalItems": 2
    }
  }
  ```

#### Add Item to Cart
- **URL:** `POST /api/cart`
- **Body:**
  ```json
  {
    "userId": "guest",
    "productId": "product-id",
    "quantity": 1
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Item added to cart",
    "data": {
      "cartId": "...",
      "userId": "guest",
      "items": [...],
      "totalAmount": 99.99,
      "totalItems": 1
    }
  }
  ```

#### Remove Item from Cart
- **URL:** `DELETE /api/cart/:id`
- **Body:**
  ```json
  {
    "userId": "guest"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Item removed from cart",
    "data": {
      "cartId": "...",
      "userId": "guest",
      "items": [...],
      "totalAmount": 49.99,
      "totalItems": 1
    }
  }
  ```

#### Clear Cart
- **URL:** `DELETE /api/cart`
- **Body:**
  ```json
  {
    "userId": "guest"
  }
  ```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js      # MongoDB connection
│   │   └── env.js           # Environment configuration
│   ├── models/
│   │   ├── Product.js       # Product model
│   │   └── Cart.js          # Cart model
│   ├── controllers/
│   │   ├── productController.js
│   │   └── cartController.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── index.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── scripts/
│   │   └── seedData.js      # Sample data seeder
│   └── server.js            # Entry point
├── package.json
└── README.md
```

## Models

### Product
- `name` (String, required)
- `description` (String, required)
- `price` (Number, required)
- `category` (String, required)
- `image` (String, required)
- `images` (Array of Strings)
- `stock` (Number, required)
- `rating` (Number, 0-5)
- `reviews` (Array of review objects)
- `createdAt` (Date)
- `updatedAt` (Date)

### Cart
- `userId` (String, required)
- `items` (Array of cart items)
  - `productId` (ObjectId, ref: Product)
  - `quantity` (Number, required)
  - `price` (Number, required)
- `totalAmount` (Number, calculated)
- `totalItems` (Number, calculated)
- `createdAt` (Date)
- `updatedAt` (Date)

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB Atlas connection string
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Allowed CORS origin

## Error Handling

All errors are handled by middleware and return consistent JSON responses:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist your IP address (0.0.0.0/0 for development)
5. Get connection string
6. Update `.env` file with connection string

## Testing

Test the API endpoints using:
- Postman
- cURL
- Frontend application
- Browser (for GET requests)

### Example cURL commands

```bash
# Get all products
curl http://localhost:5000/api/products

# Get product by ID
curl http://localhost:5000/api/products/PRODUCT_ID

# Add to cart
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"userId":"guest","productId":"PRODUCT_ID","quantity":1}'

# Get cart
curl http://localhost:5000/api/cart?userId=guest

# Remove from cart
curl -X DELETE http://localhost:5000/api/cart/ITEM_ID \
  -H "Content-Type: application/json" \
  -d '{"userId":"guest"}'
```

## Scripts

- `npm start` - Start server
- `npm run dev` - Start server with nodemon (auto-reload)
- `npm run seed` - Seed sample data

## License

MIT

