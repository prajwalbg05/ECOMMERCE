# Project Folder Structure

Visual representation of the complete project structure.

```
deligient/
│
├── frontend/                          # React.js Frontend Application
│   ├── public/                        # Static assets
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   ├── src/                          # Source code
│   │   ├── components/               # React components
│   │   │   ├── common/               # Common UI components
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Loading.jsx
│   │   │   │   └── ErrorMessage.jsx
│   │   │   │
│   │   │   ├── product/              # Product components
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── ProductList.jsx
│   │   │   │   ├── ProductDetail.jsx
│   │   │   │   └── ProductSearch.jsx
│   │   │   │
│   │   │   ├── cart/                 # Cart components
│   │   │   │   ├── CartItem.jsx
│   │   │   │   ├── CartSummary.jsx
│   │   │   │   └── CartPage.jsx
│   │   │   │
│   │   │   └── auth/                 # Authentication components
│   │   │       ├── LoginForm.jsx
│   │   │       ├── RegisterForm.jsx
│   │   │       └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/                    # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   │
│   │   ├── context/                  # React Context for state management
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   └── ProductContext.jsx
│   │   │
│   │   ├── services/                 # API service functions
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── productService.js
│   │   │   └── cartService.js
│   │   │
│   │   ├── utils/                    # Utility functions
│   │   │   ├── constants.js
│   │   │   ├── helpers.js
│   │   │   └── validators.js
│   │   │
│   │   ├── hooks/                    # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useCart.js
│   │   │   └── useProducts.js
│   │   │
│   │   ├── App.jsx                   # Main App component
│   │   ├── App.css
│   │   ├── index.js                  # Entry point
│   │   └── index.css
│   │
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── backend/                          # Node.js + Express.js Backend
│   ├── src/                         # Source code
│   │   ├── config/                  # Configuration files
│   │   │   ├── database.js          # MongoDB connection
│   │   │   ├── env.js               # Environment variables
│   │   │   └── constants.js
│   │   │
│   │   ├── models/                  # MongoDB Mongoose models
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── Cart.js
│   │   │   └── Order.js
│   │   │
│   │   ├── routes/                  # API routes
│   │   │   ├── index.js             # Route aggregator
│   │   │   ├── auth.routes.js
│   │   │   ├── product.routes.js
│   │   │   ├── cart.routes.js
│   │   │   └── order.routes.js
│   │   │
│   │   ├── controllers/             # Route controllers
│   │   │   ├── auth.controller.js
│   │   │   ├── product.controller.js
│   │   │   ├── cart.controller.js
│   │   │   └── order.controller.js
│   │   │
│   │   ├── services/                # Business logic
│   │   │   ├── auth.service.js
│   │   │   ├── product.service.js
│   │   │   ├── cart.service.js
│   │   │   └── order.service.js
│   │   │
│   │   ├── middleware/              # Express middleware
│   │   │   ├── auth.middleware.js
│   │   │   ├── validation.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── logger.middleware.js
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   ├── jwt.js
│   │   │   ├── bcrypt.js
│   │   │   ├── validators.js
│   │   │   └── errors.js
│   │   │
│   │   └── server.js                # Express app entry point
│   │
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── docs/                            # Documentation
│   └── API.md                       # API documentation
│
├── ARCHITECTURE.md                  # Complete architecture documentation
├── FOLDER_STRUCTURE.md              # This file
├── README.md                        # Project README
└── .gitignore                       # Root gitignore
```

## Key Directories Explained

### Frontend Structure

- **components/**: Reusable UI components organized by feature area
- **pages/**: Full page components that combine multiple components
- **context/**: React Context API for global state management (auth, cart)
- **services/**: API communication layer that handles HTTP requests
- **hooks/**: Custom React hooks for reusable logic
- **utils/**: Helper functions and constants

### Backend Structure

- **config/**: Configuration files for database and environment
- **models/**: MongoDB Mongoose schemas defining data structure
- **routes/**: API endpoint definitions
- **controllers/**: Request handlers that process requests and call services
- **services/**: Business logic separated from controllers
- **middleware/**: Express middleware for authentication, validation, error handling
- **utils/**: Utility functions for JWT, password hashing, validation

## File Naming Conventions

- **Components**: PascalCase (e.g., `ProductCard.jsx`)
- **Utilities/Services**: camelCase (e.g., `authService.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_CONSTANTS.js`)
- **Routes**: kebab-case (e.g., `auth.routes.js`)
- **Models**: PascalCase (e.g., `User.js`)

