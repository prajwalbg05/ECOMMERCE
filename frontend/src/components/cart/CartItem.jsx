import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart, loading } = useCart();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(item.id);
    }
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      handleRemove();
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="cart-item">
      <Link to={`/products/${item.productId}`} className="cart-item-image-link">
        <img
          src={item.image}
          alt={item.name}
          className="cart-item-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
          }}
        />
      </Link>

      <div className="cart-item-details">
        <Link to={`/products/${item.productId}`} className="cart-item-name-link">
          <h3 className="cart-item-name">{item.name}</h3>
        </Link>
        <p className="cart-item-price">{formatPrice(item.price)}</p>
      </div>

      <div className="cart-item-controls">
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={handleDecrease}
            disabled={loading}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
            disabled={loading}
          />
          <button
            className="quantity-btn"
            onClick={handleIncrease}
            disabled={loading}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className="cart-item-total">
          {formatPrice(item.price * item.quantity)}
        </div>

        <button
          className="cart-item-remove"
          onClick={handleRemove}
          disabled={loading}
          aria-label="Remove item"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem;

