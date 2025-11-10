# API Documentation

## Base URL
```
Production: https://your-backend.onrender.com/api
Development: http://localhost:5000/api
```

## Authentication

All protected endpoints require an authentication token in the request header:
```
Authorization: Bearer <token>
```

## Error Response Format

All errors follow this format:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information (optional)"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Authentication Endpoints

### Register User
- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Auth Required:** No
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Login User
- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Auth Required:** No
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Get Current User
- **URL:** `/api/auth/me`
- **Method:** `GET`
- **Auth Required:** Yes

---

## Product Endpoints

### Get All Products
- **URL:** `/api/products`
- **Method:** `GET`
- **Auth Required:** No
- **Query Parameters:**
  - `page` (number, optional): Page number
  - `limit` (number, optional): Items per page
  - `category` (string, optional): Filter by category
  - `search` (string, optional): Search query
  - `sort` (string, optional): Sort order (asc/desc)

### Get Product by ID
- **URL:** `/api/products/:productId`
- **Method:** `GET`
- **Auth Required:** No
- **URL Parameters:**
  - `productId` (string, required): Product ID

---

## Cart Endpoints

### Get User Cart
- **URL:** `/api/cart`
- **Method:** `GET`
- **Auth Required:** Yes

### Add Item to Cart
- **URL:** `/api/cart/items`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "productId": "507f1f77bcf86cd799439012",
    "quantity": 2
  }
  ```

### Update Cart Item
- **URL:** `/api/cart/items/:itemId`
- **Method:** `PUT`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "quantity": 3
  }
  ```

### Remove Item from Cart
- **URL:** `/api/cart/items/:itemId`
- **Method:** `DELETE`
- **Auth Required:** Yes

### Clear Cart
- **URL:** `/api/cart`
- **Method:** `DELETE`
- **Auth Required:** Yes

---

## Order Endpoints (Future Implementation)

### Create Order
- **URL:** `/api/orders`
- **Method:** `POST`
- **Auth Required:** Yes

### Get User Orders
- **URL:** `/api/orders`
- **Method:** `GET`
- **Auth Required:** Yes

### Get Order by ID
- **URL:** `/api/orders/:orderId`
- **Method:** `GET`
- **Auth Required:** Yes

