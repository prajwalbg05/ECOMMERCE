import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/productService';
import ProductList from '../components/product/ProductList';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProducts();
      if (response.success && response.data) {
        setProducts(response.data.products || []);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      console.error('Error loading products:', err);
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadProducts();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await getProducts({ search: searchQuery });
      if (response.success && response.data) {
        setProducts(response.data.products || []);
      } else {
        setError('No products found');
      }
    } catch (err) {
      console.error('Error searching products:', err);
      setError(err.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = searchQuery
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1 className="hero-title">Welcome to Our Store</h1>
        <p className="hero-subtitle">Discover amazing products at great prices</p>
      </div>

      <div className="home-content">
        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
        </div>

        {loading && <Loading />}
        {error && !loading && <ErrorMessage message={error} />}
        {!loading && !error && (
          <>
            <div className="products-header">
              <h2 className="products-title">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
              </h2>
              <p className="products-count">{filteredProducts.length} products</p>
            </div>
            <ProductList products={filteredProducts} loading={false} error={null} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;

