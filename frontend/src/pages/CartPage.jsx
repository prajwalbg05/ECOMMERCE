import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Loading from '../components/common/Loading';
import './CartPage.css';

const CartPage = () => {
  const { cart, loading, clearCart } = useCart();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-page-title">Shopping Cart</h1>

        {cart.items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Start shopping to add items to your cart</p>
            <Link to="/" className="shop-now-btn">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-container">
              <div className="cart-items-header">
                <h2>Items ({cart.totalItems})</h2>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear your cart?')) {
                      clearCart();
                    }
                  }}
                  className="clear-cart-btn"
                >
                  Clear Cart
                </button>
              </div>
              <div className="cart-items-list">
                {cart.items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="cart-summary-container">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

