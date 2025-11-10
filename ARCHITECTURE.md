# E-Commerce Web Application - Technical Architecture

## Table of Contents
1. [High-Level System Architecture](#high-level-system-architecture)
2. [Folder Structure](#folder-structure)
3. [API Design](#api-design)
4. [Authentication & State Management](#authentication--state-management)
5. [Deployment Strategy](#deployment-strategy)

---

## High-Level System Architecture

### System Overview

The E-Commerce application follows a **three-tier architecture** pattern:

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  React.js Frontend (Vercel/Netlify)                         │
│  - Product Catalog                                          │
│  - Product Details                                          │
│  - Shopping Cart                                            │
│  - User Authentication UI                                    │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS/REST API
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                     Application Layer                        │
│  Node.js + Express.js Backend (Render)                      │
│  - RESTful API Endpoints                                    │
│  - Business Logic                                           │
│  - Authentication Middleware                                │
│  - Request Validation                                       │
└──────────────────────┬──────────────────────────────────────┘
                       │ MongoDB Driver
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                       Data Layer                             │
│  MongoDB Atlas (Cloud Database)                             │
│  - User Collections                                         │
│  - Product Collections                                      │
│  - Order Collections                                        │
│  - Cart Collections                                         │
└─────────────────────────────────────────────────────────────┘
```

### Component Interactions

1. **Frontend (React.js)**
   - Serves static assets and provides user interface
   - Makes API calls to backend for data operations
   - Manages client-side state (cart, user session)
   - Handles routing with React Router

2. **Backend (Node.js + Express.js)**
   - Receives HTTP requests from frontend
   - Processes business logic
   - Validates requests and authenticates users
   - Communicates with MongoDB Atlas for data operations
   - Returns JSON responses

3. **Database (MongoDB Atlas)**
   - Stores user accounts, products, orders, and cart data
   - Provides data persistence and retrieval
   - Handles indexing for efficient queries

### API Flow Example (Add to Cart)

```
User Action → React Component → API Call → Express Route → 
Middleware (Auth) → Controller → Service → MongoDB → 
Response → Frontend State Update → UI Re-render
```

---

## Folder Structure

### Root Directory Structure

```
deligient/
├── frontend/                 # React.js frontend application
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Loading.jsx
│   │   │   │   └── ErrorMessage.jsx
│   │   │   ├── product/
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── ProductList.jsx
│   │   │   │   ├── ProductDetail.jsx
│   │   │   │   └── ProductSearch.jsx
│   │   │   ├── cart/
│   │   │   │   ├── CartItem.jsx
│   │   │   │   ├── CartSummary.jsx
│   │   │   │   └── CartPage.jsx
│   │   │   └── auth/
│   │   │       ├── LoginForm.jsx
│   │   │       ├── RegisterForm.jsx
│   │   │       └── ProtectedRoute.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── context/          # React Context for state management
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   └── ProductContext.jsx
│   │   ├── services/         # API service functions
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── productService.js
│   │   │   └── cartService.js
│   │   ├── utils/            # Utility functions
│   │   │   ├── constants.js
│   │   │   ├── helpers.js
│   │   │   └── validators.js
│   │   ├── hooks/            # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useCart.js
│   │   │   └── useProducts.js
│   │   ├── App.jsx           # Main App component
│   │   ├── App.css
│   │   ├── index.js          # Entry point
│   │   └── index.css
│   ├── package.json
│   └── .env.example
│
├── backend/                  # Node.js + Express.js backend
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   │   ├── database.js   # MongoDB connection
│   │   │   ├── env.js        # Environment variables
│   │   │   └── constants.js
│   │   ├── models/           # MongoDB models/schemas
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── Cart.js
│   │   │   └── Order.js
│   │   ├── routes/           # API routes
│   │   │   ├── index.js      # Route aggregator
│   │   │   ├── auth.routes.js
│   │   │   ├── product.routes.js
│   │   │   ├── cart.routes.js
│   │   │   └── order.routes.js
│   │   ├── controllers/      # Route controllers
│   │   │   ├── auth.controller.js
│   │   │   ├── product.controller.js
│   │   │   ├── cart.controller.js
│   │   │   └── order.controller.js
│   │   ├── services/         # Business logic
│   │   │   ├── auth.service.js
│   │   │   ├── product.service.js
│   │   │   ├── cart.service.js
│   │   │   └── order.service.js
│   │   ├── middleware/       # Express middleware
│   │   │   ├── auth.middleware.js
│   │   │   ├── validation.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── logger.middleware.js
│   │   ├── utils/            # Utility functions
│   │   │   ├── jwt.js
│   │   │   ├── bcrypt.js
│   │   │   ├── validators.js
│   │   │   └── errors.js
│   │   └── server.js         # Express app entry point
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── docs/                     # Additional documentation
│   └── API.md
├── .gitignore
└── README.md
```

### Key Folder Explanations

**Frontend:**
- `components/`: Reusable UI components organized by feature
- `pages/`: Full page components that combine multiple components
- `context/`: React Context API for global state management
- `services/`: API communication layer
- `hooks/`: Custom React hooks for reusable logic

**Backend:**
- `models/`: MongoDB Mongoose schemas
- `routes/`: API endpoint definitions
- `controllers/`: Request handlers that call services
- `services/`: Business logic separated from controllers
- `middleware/`: Express middleware for auth, validation, errors

---

## API Design

### Base URL
```
Production: https://your-backend.onrender.com/api
Development: http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
- **Endpoint:** `POST /api/auth/register`
- **Description:** Create a new user account
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "userId": "507f1f77bcf86cd799439011",
      "email": "john@example.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

#### Login User
- **Endpoint:** `POST /api/auth/login`
- **Description:** Authenticate user and return JWT token
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "userId": "507f1f77bcf86cd799439011",
      "email": "john@example.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

#### Get Current User
- **Endpoint:** `GET /api/auth/me`
- **Description:** Get current authenticated user details
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "userId": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

### Product Endpoints

#### Get All Products
- **Endpoint:** `GET /api/products`
- **Description:** Retrieve all products with pagination and filtering
- **Query Parameters:**
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
  - `category` (optional): Filter by category
  - `search` (optional): Search by name/description
  - `sort` (optional): Sort by price (asc/desc)
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "products": [
        {
          "productId": "507f1f77bcf86cd799439012",
          "name": "Product Name",
          "description": "Product description",
          "price": 29.99,
          "category": "Electronics",
          "image": "https://example.com/image.jpg",
          "stock": 100,
          "rating": 4.5
        }
      ],
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
- **Endpoint:** `GET /api/products/:productId`
- **Description:** Get detailed information about a specific product
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "productId": "507f1f77bcf86cd799439012",
      "name": "Product Name",
      "description": "Detailed product description",
      "price": 29.99,
      "category": "Electronics",
      "images": ["url1", "url2"],
      "stock": 100,
      "rating": 4.5,
      "reviews": []
    }
  }
  ```

### Cart Endpoints

#### Get User Cart
- **Endpoint:** `GET /api/cart`
- **Description:** Get current user's shopping cart
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "cartId": "507f1f77bcf86cd799439013",
      "userId": "507f1f77bcf86cd799439011",
      "items": [
        {
          "productId": "507f1f77bcf86cd799439012",
          "name": "Product Name",
          "price": 29.99,
          "quantity": 2,
          "image": "https://example.com/image.jpg"
        }
      ],
      "totalAmount": 59.98,
      "totalItems": 2
    }
  }
  ```

#### Add Item to Cart
- **Endpoint:** `POST /api/cart/items`
- **Description:** Add a product to the cart
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "productId": "507f1f77bcf86cd799439012",
    "quantity": 2
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Item added to cart",
    "data": {
      "cartId": "507f1f77bcf86cd799439013",
      "items": [...],
      "totalAmount": 59.98
    }
  }
  ```

#### Update Cart Item
- **Endpoint:** `PUT /api/cart/items/:itemId`
- **Description:** Update quantity of an item in cart
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "quantity": 3
  }
  ```

#### Remove Item from Cart
- **Endpoint:** `DELETE /api/cart/items/:itemId`
- **Description:** Remove an item from cart
- **Headers:** `Authorization: Bearer <token>`

#### Clear Cart
- **Endpoint:** `DELETE /api/cart`
- **Description:** Clear all items from cart
- **Headers:** `Authorization: Bearer <token>`

### Data Schemas

#### User Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  role: String (default: "customer"),
  createdAt: Date,
  updatedAt: Date
}
```

#### Product Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  price: Number (required, min: 0),
  category: String (required),
  image: String (required),
  images: [String],
  stock: Number (required, min: 0),
  rating: Number (default: 0, min: 0, max: 5),
  reviews: [{
    userId: ObjectId,
    rating: Number,
    comment: String,
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

#### Cart Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId (required, ref: "User"),
  items: [{
    productId: ObjectId (ref: "Product"),
    quantity: Number (required, min: 1),
    price: Number (required)
  }],
  totalAmount: Number (default: 0),
  totalItems: Number (default: 0),
  updatedAt: Date
}
```

#### Order Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId (required, ref: "User"),
  items: [{
    productId: ObjectId (ref: "Product"),
    quantity: Number,
    price: Number
  }],
  totalAmount: Number (required),
  status: String (enum: ["pending", "processing", "shipped", "delivered", "cancelled"]),
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## Authentication & State Management

### Authentication Strategy

#### Backend Authentication
- **JWT (JSON Web Tokens)** for stateless authentication
- **bcrypt** for password hashing
- **Token Expiration:** 7 days (configurable)
- **Refresh Token:** Optional implementation for enhanced security

#### Authentication Flow
1. User registers/logs in → Backend validates credentials
2. Backend generates JWT token with user ID and email
3. Token sent to frontend and stored in localStorage or httpOnly cookie
4. Frontend includes token in `Authorization` header for protected routes
5. Backend middleware validates token on each request
6. If valid, request proceeds; if invalid, returns 401 Unauthorized

#### Protected Routes Middleware
```javascript
// Example middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};
```

### State Management Plan

#### Frontend State Management

**1. React Context API**
- **AuthContext**: Manages user authentication state
  - `user`: Current user object
  - `token`: JWT token
  - `isAuthenticated`: Boolean
  - `login()`: Login function
  - `logout()`: Logout function
  - `register()`: Register function

- **CartContext**: Manages shopping cart state
  - `cart`: Cart object with items
  - `totalItems`: Total number of items
  - `totalAmount`: Total price
  - `addToCart()`: Add item to cart
  - `removeFromCart()`: Remove item from cart
  - `updateQuantity()`: Update item quantity
  - `clearCart()`: Clear all items

- **ProductContext** (Optional): Manages product list state
  - `products`: Array of products
  - `loading`: Loading state
  - `error`: Error state
  - `fetchProducts()`: Fetch products from API

**2. Local Storage**
- Store JWT token (or use httpOnly cookies for better security)
- Persist cart data (optional, cart stored on backend)
- Store user preferences

**3. Component State (useState)**
- Form inputs
- UI state (modals, dropdowns, etc.)
- Temporary data that doesn't need global state

#### State Flow Example (Add to Cart)

```
User clicks "Add to Cart" 
  → Component calls CartContext.addToCart(productId, quantity)
  → CartContext makes API call to backend
  → Backend updates MongoDB cart
  → Backend returns updated cart
  → CartContext updates local state
  → All components consuming CartContext re-render
  → UI updates (cart icon shows new count)
```

#### State Management Best Practices

1. **Keep state as close as possible** to where it's used
2. **Use Context for global state** (auth, cart)
3. **Use useState for local component state**
4. **Avoid prop drilling** by using Context
5. **Optimize re-renders** with React.memo and useMemo
6. **Handle loading and error states** in Context

---

## Deployment Strategy

### Frontend Deployment (Vercel/Netlify)

#### Option 1: Vercel
**Steps:**
1. Push frontend code to GitHub repository
2. Connect repository to Vercel
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `build` or `dist`
   - Install Command: `npm install`
4. Add environment variables:
   - `REACT_APP_API_URL`: Backend API URL
5. Deploy

**Advantages:**
- Automatic deployments on git push
- Free SSL certificates
- CDN distribution
- Preview deployments for PRs
- Serverless functions support

#### Option 2: Netlify
**Steps:**
1. Push frontend code to GitHub repository
2. Connect repository to Netlify
3. Configure build settings (same as Vercel)
4. Add environment variables
5. Deploy

**Advantages:**
- Similar to Vercel
- Good for static sites
- Form handling support
- Edge functions

### Backend Deployment (Render)

#### Render Deployment
**Steps:**
1. Push backend code to GitHub repository
2. Create new Web Service on Render
3. Connect GitHub repository
4. Configure settings:
   - Build Command: `npm install`
   - Start Command: `node src/server.js` or `npm start`
   - Environment: Node
5. Add environment variables:
   - `PORT`: Server port (Render provides this)
   - `MONGODB_URI`: MongoDB Atlas connection string
   - `JWT_SECRET`: Secret for JWT tokens
   - `NODE_ENV`: production
6. Deploy

**Advantages:**
- Free tier available
- Automatic SSL
- Automatic deployments
- Environment variable management
- Logs and monitoring

### Database Deployment (MongoDB Atlas)

#### MongoDB Atlas Setup
**Steps:**
1. Create MongoDB Atlas account
2. Create a new cluster (free tier: M0)
3. Configure network access (allow all IPs or specific IPs)
4. Create database user
5. Get connection string
6. Update backend environment variables with connection string

**Connection String Format:**
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database-name>?retryWrites=true&w=majority
```

**Advantages:**
- Free tier (512MB storage)
- Automatic backups
- Scalable
- Global clusters
- Built-in security

### Environment Variables

#### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production
CORS_ORIGIN=https://your-frontend.vercel.app
```

### Deployment Checklist

- [ ] Set up MongoDB Atlas cluster
- [ ] Configure network access in MongoDB Atlas
- [ ] Create database user in MongoDB Atlas
- [ ] Push code to GitHub repository
- [ ] Deploy backend to Render
- [ ] Configure backend environment variables
- [ ] Test backend API endpoints
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Configure frontend environment variables
- [ ] Update CORS settings in backend
- [ ] Test complete application flow
- [ ] Set up custom domain (optional)
- [ ] Configure SSL certificates (automatic on Vercel/Netlify/Render)
- [ ] Set up monitoring and error tracking (optional)
- [ ] Configure backup strategy for database

### Post-Deployment

1. **Monitor Logs**: Check Render logs for backend errors
2. **Test API**: Use Postman or curl to test all endpoints
3. **Test Frontend**: Verify all features work in production
4. **Performance**: Monitor response times and optimize if needed
5. **Security**: Ensure all environment variables are set correctly
6. **Backups**: MongoDB Atlas provides automatic backups (enable in paid tiers)

### Cost Estimation (Free Tier)

- **Frontend (Vercel/Netlify)**: Free
- **Backend (Render)**: Free (with limitations)
- **Database (MongoDB Atlas)**: Free (512MB storage)
- **Total**: $0/month (for development/small projects)

### Scaling Considerations

1. **Database**: Upgrade MongoDB Atlas tier as data grows
2. **Backend**: Render free tier has limitations; upgrade for production
3. **CDN**: Vercel/Netlify provide CDN automatically
4. **Caching**: Implement Redis for session/cart caching (optional)
5. **Load Balancing**: Use Render's load balancing for high traffic
6. **Monitoring**: Integrate Sentry or similar for error tracking

---

## Additional Recommendations

### Security Best Practices

1. **HTTPS**: Always use HTTPS in production
2. **Environment Variables**: Never commit secrets to git
3. **Input Validation**: Validate all user inputs on backend
4. **Rate Limiting**: Implement rate limiting on API endpoints
5. **CORS**: Configure CORS to allow only your frontend domain
6. **Password Hashing**: Always hash passwords with bcrypt
7. **JWT Expiration**: Set reasonable token expiration times
8. **SQL Injection**: Use parameterized queries (Mongoose handles this)

### Performance Optimization

1. **Image Optimization**: Use CDN for product images
2. **Lazy Loading**: Implement lazy loading for product images
3. **Pagination**: Always paginate product lists
4. **Caching**: Cache frequently accessed products
5. **Database Indexing**: Add indexes on frequently queried fields
6. **Code Splitting**: Implement code splitting in React
7. **Bundle Optimization**: Minimize and compress JavaScript bundles

### Testing Strategy

1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test API endpoints
3. **E2E Tests**: Test complete user flows (Cypress/Playwright)
4. **API Testing**: Use Postman or Jest for API testing

---

## Conclusion

This architecture provides a solid foundation for a modern E-Commerce application with:
- Scalable three-tier architecture
- Secure authentication system
- Efficient state management
- RESTful API design
- Cloud-based deployment strategy
- Free tier deployment options

The architecture is designed to be maintainable, scalable, and follows industry best practices for modern web applications.

