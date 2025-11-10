import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart, loading } = useCart();
  const inCart = isInCart(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
            }}
          />
          {product.stock === 0 && (
            <div className="product-out-of-stock">Out of Stock</div>
          )}
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <div className="product-footer">
            <div className="product-price">{formatPrice(product.price)}</div>
            {product.rating && (
              <div className="product-rating">
                <span className="rating-star">⭐</span>
                <span className="rating-value">{product.rating}</span>
              </div>
            )}
          </div>
        </div>
      </Link>

      <button
        className={`product-add-btn ${inCart ? 'in-cart' : ''} ${product.stock === 0 ? 'disabled' : ''}`}
        onClick={handleAddToCart}
        disabled={loading || product.stock === 0}
      >
        {loading ? (
          'Adding...'
        ) : inCart ? (
          '✓ In Cart'
        ) : (
          'Add to Cart'
        )}
      </button>
    </div>
  );
};

export default ProductCard;

