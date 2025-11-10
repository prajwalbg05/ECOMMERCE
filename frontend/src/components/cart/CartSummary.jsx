import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';
import './CartSummary.css';

const CartSummary = () => {
  const { cart } = useCart();
  const subtotal = cart.totalAmount;
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + shipping;

  return (
    <div className="cart-summary">
      <h2 className="cart-summary-title">Order Summary</h2>
      <div className="cart-summary-details">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>
        {subtotal < 100 && (
          <div className="summary-note">
            Add {formatPrice(100 - subtotal)} more for free shipping!
          </div>
        )}
        <div className="summary-divider"></div>
        <div className="summary-row summary-total">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
      <button className="checkout-btn" disabled={cart.items.length === 0}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;

