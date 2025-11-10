import api from './api';
import { API_ENDPOINTS, STORAGE_KEYS } from '../utils/constants';

// Get or create userId from localStorage
const getUserId = () => {
  let userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
  }
  return userId;
};

// Get user cart
export const getCart = async () => {
  try {
    const userId = getUserId();
    const response = await api.get(API_ENDPOINTS.CART, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    // Return empty cart as fallback
    return {
      success: true,
      data: {
        items: [],
        totalAmount: 0,
        totalItems: 0,
      },
    };
  }
};

// Add item to cart
export const addToCart = async (productId, quantity = 1) => {
  try {
    const userId = getUserId();
    const response = await api.post(API_ENDPOINTS.CART_ITEMS, {
      userId,
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Update cart item
export const updateCartItem = async (itemId, quantity) => {
  try {
    const userId = getUserId();
    const response = await api.put(API_ENDPOINTS.CART_ITEM(itemId), {
      userId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

// Remove item from cart
export const removeFromCart = async (itemId) => {
  try {
    const userId = getUserId();
    const response = await api.delete(API_ENDPOINTS.CART_ITEM(itemId), {
      data: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Clear cart
export const clearCart = async () => {
  try {
    const userId = getUserId();
    const response = await api.delete(API_ENDPOINTS.CART, {
      data: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

