import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, getItemQuantity, loading: cartLoading } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProductById(productId);
      if (response.success && response.data) {
        setProduct(response.data);
        const currentQuantity = getItemQuantity(response.data.id);
        if (currentQuantity > 0) {
          setQuantity(currentQuantity);
        }
      } else {
        setError('Product not found');
      }
    } catch (err) {
      console.error('Error loading product:', err);
      setError(err.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0 && newQuantity <= (product?.stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < (product?.stock || 0)) {
      setQuantity(quantity + 1);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <ErrorMessage message={error || 'Product not found'} />
          <button onClick={() => navigate('/')} className="back-btn">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const isOutOfStock = product.stock === 0;

  return (
    <div className="product-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>

        <div className="product-detail">
          <div className="product-detail-image-container">
            <img
              src={product.image}
              alt={product.name}
              className="product-detail-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x600?text=No+Image';
              }}
            />
          </div>

          <div className="product-detail-info">
            <h1 className="product-detail-name">{product.name}</h1>
            {product.rating && (
              <div className="product-detail-rating">
                <span className="rating-star">⭐</span>
                <span className="rating-value">{product.rating}</span>
              </div>
            )}
            <div className="product-detail-price">{formatPrice(product.price)}</div>
            <p className="product-detail-description">{product.description}</p>

            <div className="product-detail-meta">
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{product.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Stock:</span>
                <span className={`meta-value ${isOutOfStock ? 'out-of-stock' : 'in-stock'}`}>
                  {isOutOfStock ? 'Out of Stock' : `${product.stock} available`}
                </span>
              </div>
            </div>

            {!isOutOfStock && (
              <div className="product-detail-actions">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={handleDecreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="quantity-input"
                    />
                    <button
                      className="quantity-btn"
                      onClick={handleIncreaseQuantity}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className={`add-to-cart-btn ${inCart ? 'in-cart' : ''}`}
                  onClick={handleAddToCart}
                  disabled={cartLoading}
                >
                  {cartLoading
                    ? 'Adding...'
                    : inCart
                    ? '✓ Added to Cart'
                    : 'Add to Cart'}
                </button>
              </div>
            )}

            {isOutOfStock && (
              <div className="out-of-stock-message">
                This product is currently out of stock.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

