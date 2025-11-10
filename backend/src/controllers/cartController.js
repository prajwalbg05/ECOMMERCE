const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Public
const getCart = async (req, res) => {
  try {
    const { userId = 'guest' } = req.query;

    // Find cart for user
    let cart = await Cart.findOne({ userId }).populate(
      'items.productId',
      'name image price stock'
    );

    if (!cart) {
      // Return empty cart if not found
      return res.status(200).json({
        success: true,
        data: {
          cartId: null,
          userId,
          items: [],
          totalAmount: 0,
          totalItems: 0,
        },
      });
    }

    res.status(200).json({
      success: true,
      data: {
        cartId: cart._id,
        userId: cart.userId,
        items: cart.items.map((item) => ({
          id: item._id,
          productId: item.productId._id || item.productId,
          name: item.productId?.name || 'Product',
          image: item.productId?.image || '',
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: cart.totalAmount,
        totalItems: cart.totalItems,
      },
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: error.message,
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Public
const addToCart = async (req, res) => {
  try {
    const { userId = 'guest', productId, quantity = 1 } = req.body;

    // Validate input
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required',
      });
    }

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format',
      });
    }

    // Validate quantity
    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1',
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check if product is in stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
      });
    }

    // Find or create cart for user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      });
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;

      // Check stock availability
      if (product.stock < newQuantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock',
        });
      }

      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item to cart
      cart.items.push({
        productId,
        quantity,
        price: product.price,
      });
    }

    // Save cart (totals will be calculated by pre-save hook)
    await cart.save();

    // Populate product details for response
    await cart.populate('items.productId', 'name image price');

    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      data: {
        cartId: cart._id,
        userId: cart.userId,
        items: cart.items.map((item) => ({
          id: item._id,
          productId: item.productId._id || item.productId,
          name: item.productId?.name || 'Product',
          image: item.productId?.image || '',
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: cart.totalAmount,
        totalItems: cart.totalItems,
      },
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding item to cart',
      error: error.message,
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Public
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId = 'guest' } = req.body;

    // Validate input
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Cart item ID is required',
      });
    }

    // Validate MongoDB ObjectId format for cart item ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid cart item ID format',
      });
    }

    // Find cart for user
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    // Find item in cart
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === id
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart',
      });
    }

    // Remove item from cart
    cart.items.splice(itemIndex, 1);

    // Save cart (totals will be recalculated by pre-save hook)
    await cart.save();

    // Populate product details for response
    await cart.populate('items.productId', 'name image price');

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      data: {
        cartId: cart._id,
        userId: cart.userId,
        items: cart.items.map((item) => ({
          id: item._id,
          productId: item.productId._id || item.productId,
          name: item.productId?.name || 'Product',
          image: item.productId?.image || '',
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: cart.totalAmount,
        totalItems: cart.totalItems,
      },
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing item from cart',
      error: error.message,
    });
  }
};

// @desc    Add item to cart (alternative route for /cart/items)
// @route   POST /api/cart/items
// @access  Public
const addToCartItems = async (req, res) => {
  // Use the same logic as addToCart
  return addToCart(req, res);
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/items/:id
// @access  Public
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId = 'guest', quantity } = req.body;

    // Validate input
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Cart item ID is required',
      });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1',
      });
    }

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid cart item ID format',
      });
    }

    // Find cart for user
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    // Find item in cart
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === id
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart',
      });
    }

    // Get product to check stock
    const product = await Product.findById(cart.items[itemIndex].productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check stock availability
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
      });
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;

    // Save cart
    await cart.save();

    // Populate product details for response
    await cart.populate('items.productId', 'name image price');

    res.status(200).json({
      success: true,
      message: 'Cart item updated',
      data: {
        cartId: cart._id,
        userId: cart.userId,
        items: cart.items.map((item) => ({
          id: item._id,
          productId: item.productId._id || item.productId,
          name: item.productId?.name || 'Product',
          image: item.productId?.image || '',
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: cart.totalAmount,
        totalItems: cart.totalItems,
      },
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating cart item',
      error: error.message,
    });
  }
};

// @desc    Remove item from cart (alternative route for /cart/items/:id)
// @route   DELETE /api/cart/items/:id
// @access  Public
const removeFromCartItems = async (req, res) => {
  // Use the same logic as removeFromCart
  return removeFromCart(req, res);
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Public
const clearCart = async (req, res) => {
  try {
    const { userId = 'guest' } = req.body;

    // Find cart for user
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    // Clear items
    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared',
      data: {
        cartId: cart._id,
        userId: cart.userId,
        items: [],
        totalAmount: 0,
        totalItems: 0,
      },
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error clearing cart',
      error: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  addToCartItems,
  updateCartItem,
  removeFromCartItems,
  clearCart,
};
