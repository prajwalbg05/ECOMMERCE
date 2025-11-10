import api from './api';
import { API_ENDPOINTS, DUMMY_PRODUCTS } from '../utils/constants';

// Get all products
export const getProducts = async (params = {}) => {
  try {
    const response = await api.get(API_ENDPOINTS.PRODUCTS, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return dummy data as fallback
    return {
      success: true,
      data: {
        products: DUMMY_PRODUCTS,
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalProducts: DUMMY_PRODUCTS.length,
        },
      },
    };
  }
};

// Get product by ID
export const getProductById = async (productId) => {
  try {
    const response = await api.get(API_ENDPOINTS.PRODUCT(productId));
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    // Return dummy data as fallback
    const product = DUMMY_PRODUCTS.find((p) => p.id === productId);
    if (product) {
      return {
        success: true,
        data: product,
      };
    }
    throw new Error('Product not found');
  }
};

// Search products
export const searchProducts = async (query) => {
  try {
    const response = await api.get(API_ENDPOINTS.PRODUCTS, {
      params: { search: query },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    // Return filtered dummy data as fallback
    const filtered = DUMMY_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    );
    return {
      success: true,
      data: {
        products: filtered,
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalProducts: filtered.length,
        },
      },
    };
  }
};

