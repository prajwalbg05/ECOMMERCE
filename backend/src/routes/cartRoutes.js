const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  addToCartItems,
  updateCartItem,
  removeFromCartItems,
  clearCart,
} = require('../controllers/cartController');

// @route   GET /api/cart
// @desc    Get user cart
// @access  Public
router.get('/', getCart);

// @route   POST /api/cart/items
// @desc    Add item to cart (alternative route for frontend compatibility)
// @access  Public
router.post('/items', addToCartItems);

// @route   PUT /api/cart/items/:id
// @desc    Update cart item quantity
// @access  Public
router.put('/items/:id', updateCartItem);

// @route   DELETE /api/cart/items/:id
// @desc    Remove item from cart (alternative route for frontend compatibility)
// @access  Public
router.delete('/items/:id', removeFromCartItems);

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Public
router.post('/', addToCart);

// @route   DELETE /api/cart/:id
// @desc    Remove item from cart
// @access  Public
router.delete('/:id', removeFromCart);

// @route   DELETE /api/cart
// @desc    Clear cart
// @access  Public
router.delete('/', clearCart);

module.exports = router;
