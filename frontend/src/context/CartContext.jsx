import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../services/cartService';
import { calculateTotal, calculateTotalItems } from '../utils/helpers';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    totalAmount: 0,
    totalItems: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load cart from API or local storage on mount
  useEffect(() => {
    loadCart();
  }, []);

  // Update totals whenever cart items change
  useEffect(() => {
    const totalAmount = calculateTotal(cart.items);
    const totalItems = calculateTotalItems(cart.items);
    setCart((prev) => ({
      ...prev,
      totalAmount,
      totalItems,
    }));
  }, [cart.items]);

  // Load cart from API
  const loadCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCart();
      if (response.success && response.data) {
        setCart({
          items: response.data.items || [],
          totalAmount: response.data.totalAmount || 0,
          totalItems: response.data.totalItems || 0,
        });
      }
    } catch (err) {
      console.error('Error loading cart:', err);
      setError(err.message);
      // Try to load from localStorage as fallback
      loadCartFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  // Load cart from localStorage (fallback)
  const loadCartFromLocalStorage = () => {
    try {
      const savedCart = localStorage.getItem('ecommerce_cart');
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        setCart(cartData);
      }
    } catch (err) {
      console.error('Error loading cart from localStorage:', err);
    }
  };

  // Save cart to localStorage (fallback)
  const saveCartToLocalStorage = (cartData) => {
    try {
      localStorage.setItem('ecommerce_cart', JSON.stringify(cartData));
    } catch (err) {
      console.error('Error saving cart to localStorage:', err);
    }
  };

  // Add item to cart
  const handleAddToCart = async (product, quantity = 1) => {
    setLoading(true);
    setError(null);
    try {
      // Try to add via API
      try {
        await addToCart(product.id, quantity);
        await loadCart();
      } catch (apiError) {
        // Fallback to local storage
        addToCartLocal(product, quantity);
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError(err.message);
      // Fallback to local storage
      addToCartLocal(product, quantity);
    } finally {
      setLoading(false);
    }
  };

  // Add to cart (local storage fallback)
  const addToCartLocal = (product, quantity) => {
    setCart((prev) => {
      const existingItem = prev.items.find((item) => item.productId === product.id);
      let newItems;

      if (existingItem) {
        newItems = prev.items.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [
          ...prev.items,
          {
            productId: product.id,
            id: `local-${Date.now()}`,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
          },
        ];
      }

      const newCart = {
        items: newItems,
        totalAmount: calculateTotal(newItems),
        totalItems: calculateTotalItems(newItems),
      };

      saveCartToLocalStorage(newCart);
      return newCart;
    });
  };

  // Update cart item quantity
  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Try to update via API
      try {
        await updateCartItem(itemId, quantity);
        await loadCart();
      } catch (apiError) {
        // Fallback to local storage
        updateQuantityLocal(itemId, quantity);
      }
    } catch (err) {
      console.error('Error updating cart item:', err);
      setError(err.message);
      updateQuantityLocal(itemId, quantity);
    } finally {
      setLoading(false);
    }
  };

  // Update quantity (local storage fallback)
  const updateQuantityLocal = (itemId, quantity) => {
    setCart((prev) => {
      const newItems = prev.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );

      const newCart = {
        items: newItems,
        totalAmount: calculateTotal(newItems),
        totalItems: calculateTotalItems(newItems),
      };

      saveCartToLocalStorage(newCart);
      return newCart;
    });
  };

  // Remove item from cart
  const handleRemoveFromCart = async (itemId) => {
    setLoading(true);
    setError(null);
    try {
      // Try to remove via API
      try {
        await removeFromCart(itemId);
        await loadCart();
      } catch (apiError) {
        // Fallback to local storage
        removeFromCartLocal(itemId);
      }
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError(err.message);
      removeFromCartLocal(itemId);
    } finally {
      setLoading(false);
    }
  };

  // Remove from cart (local storage fallback)
  const removeFromCartLocal = (itemId) => {
    setCart((prev) => {
      const newItems = prev.items.filter((item) => item.id !== itemId);

      const newCart = {
        items: newItems,
        totalAmount: calculateTotal(newItems),
        totalItems: calculateTotalItems(newItems),
      };

      saveCartToLocalStorage(newCart);
      return newCart;
    });
  };

  // Clear cart
  const handleClearCart = async () => {
    setLoading(true);
    setError(null);
    try {
      // Try to clear via API
      try {
        await clearCart();
        await loadCart();
      } catch (apiError) {
        // Fallback to local storage
        clearCartLocal();
      }
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError(err.message);
      clearCartLocal();
    } finally {
      setLoading(false);
    }
  };

  // Clear cart (local storage fallback)
  const clearCartLocal = () => {
    const emptyCart = {
      items: [],
      totalAmount: 0,
      totalItems: 0,
    };
    setCart(emptyCart);
    saveCartToLocalStorage(emptyCart);
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    return cart.items.some((item) => item.productId === productId);
  };

  // Get item quantity in cart
  const getItemQuantity = (productId) => {
    const item = cart.items.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    cart,
    loading,
    error,
    addToCart: handleAddToCart,
    updateQuantity: handleUpdateQuantity,
    removeFromCart: handleRemoveFromCart,
    clearCart: handleClearCart,
    isInCart,
    getItemQuantity,
    reloadCart: loadCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

