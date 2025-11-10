// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT: (id) => `/products/${id}`,
  CART: '/cart',
  CART_ITEMS: '/cart/items',
  CART_ITEM: (id) => `/cart/items/${id}`,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  CART: 'ecommerce_cart',
  TOKEN: 'ecommerce_token',
  USER_ID: 'ecommerce_user_id',
};

// Dummy Data (Fallback if API is not available)
export const DUMMY_PRODUCTS = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and long battery life.',
    price: 99.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    stock: 50,
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with fitness tracking and smartphone connectivity.',
    price: 249.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    stock: 30,
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Laptop Backpack',
    description: 'Durable laptop backpack with padded compartments and USB charging port.',
    price: 49.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    stock: 75,
    rating: 4.3,
  },
  {
    id: '4',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precise tracking and long battery life.',
    price: 29.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    stock: 100,
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with customizable keys and switches.',
    price: 129.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    stock: 40,
    rating: 4.7,
  },
  {
    id: '6',
    name: 'USB-C Hub',
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.',
    price: 39.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500',
    stock: 60,
    rating: 4.4,
  },
  {
    id: '7',
    name: 'Monitor Stand',
    description: 'Adjustable monitor stand with cable management and extra storage space.',
    price: 79.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
    stock: 25,
    rating: 4.5,
  },
  {
    id: '8',
    name: 'Webcam HD',
    description: '1080p HD webcam with autofocus and built-in microphone.',
    price: 69.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500',
    stock: 35,
    rating: 4.2,
  },
];

