require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Product = require('../models/Product');

// Sample products data
const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals.',
    price: 99.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500',
    ],
    stock: 50,
    rating: 4.5,
  },
  {
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with fitness tracking and smartphone connectivity. Track your health and stay connected.',
    price: 249.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
    ],
    stock: 30,
    rating: 4.8,
  },
  {
    name: 'Laptop Backpack',
    description: 'Durable laptop backpack with padded compartments and USB charging port. Perfect for students and professionals.',
    price: 49.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500',
    ],
    stock: 75,
    rating: 4.3,
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precise tracking and long battery life. Comfortable for long work sessions.',
    price: 29.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    ],
    stock: 100,
    rating: 4.6,
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with customizable keys and switches. Ideal for gamers and programmers.',
    price: 129.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
      'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
    ],
    stock: 40,
    rating: 4.7,
  },
  {
    name: 'USB-C Hub',
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader. Expand your connectivity options.',
    price: 39.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500',
    images: [
      'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
    ],
    stock: 60,
    rating: 4.4,
  },
  {
    name: 'Monitor Stand',
    description: 'Adjustable monitor stand with cable management and extra storage space. Organize your workspace.',
    price: 79.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500',
    ],
    stock: 25,
    rating: 4.5,
  },
  {
    name: 'Webcam HD',
    description: '1080p HD webcam with autofocus and built-in microphone. Perfect for video calls and streaming.',
    price: 69.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500',
    images: [
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500',
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500',
    ],
    stock: 35,
    rating: 4.2,
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with 360-degree sound and waterproof design. Take your music anywhere.',
    price: 59.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500',
    ],
    stock: 45,
    rating: 4.6,
  },
  {
    name: 'Phone Stand',
    description: 'Adjustable phone stand with wireless charging. Keep your phone charged and visible.',
    price: 24.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500',
    ],
    stock: 80,
    rating: 4.3,
  },
  {
    name: 'Laptop Stand',
    description: 'Ergonomic laptop stand with adjustable height and ventilation. Improve your posture and productivity.',
    price: 44.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    ],
    stock: 55,
    rating: 4.4,
  },
  {
    name: 'Gaming Mouse Pad',
    description: 'Large gaming mouse pad with RGB lighting and smooth surface. Enhance your gaming experience.',
    price: 19.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500',
    images: [
      'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500',
    ],
    stock: 90,
    rating: 4.5,
  },
];

// Seed function
const seedProducts = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing products
    console.log('Clearing existing products...');
    await Product.deleteMany({});

    // Insert sample products
    console.log('Inserting sample products...');
    const createdProducts = await Product.insertMany(sampleProducts);

    console.log(`✅ Successfully seeded ${createdProducts.length} products`);
    console.log('\nSample products:');
    createdProducts.forEach((product) => {
      console.log(`- ${product.name} ($${product.price})`);
    });

    // Exit process
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

// Run seed function
seedProducts();

