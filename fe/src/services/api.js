const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Helper function to get auth headers with JWT token
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    throw new Error('No active session. Please login again.');
  }

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

// ==========================================
// AUTHENTICATION
// ==========================================

/**
 * Register a new user with backend API
 */
export const registerUser = async ({ email, password, firstName, lastName }) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Registration failed');
    }

    // Save token and user info to localStorage
    if (result.data?.token) {
      localStorage.setItem('authToken', result.data.token);
      localStorage.setItem('user', JSON.stringify({
        id: result.data.userId,
        email: result.data.email,
      }));
    }

    return {
      success: true,
      data: result.data,
      message: 'Đăng ký thành công!',
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Login user with email and password
 */
export const loginUser = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Login failed');
    }

    // Save token and user info to localStorage
    if (result.data?.token) {
      localStorage.setItem('authToken', result.data.token);
      localStorage.setItem('user', JSON.stringify({
        id: result.data.userId,
        email: result.data.email,
      }));
    }

    return {
      success: true,
      data: result.data,
      user: {
        id: result.data.userId,
        email: result.data.email,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Logout current user
 */
export const logoutUser = async () => {
  try {
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    if (error) throw error;

    return {
      success: true,
      message: 'Đăng xuất thành công',
    };
  } catch (error) {
    console.error('Logout error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Note: getCurrentUser, getCurrentSession, resetPassword, updatePassword removed
// These functions used Supabase Auth - implement backend equivalents if needed

// ==========================================
// USER PROFILE (Backend API)
// ==========================================

/**
 * Get user profile from backend
 */
export const getUserProfile = async () => {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${API_URL}/users/me/profile`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get profile error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (profileData) => {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${API_URL}/users/me/profile`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Update profile error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// ==========================================
// PRODUCTS (Backend API)
// ==========================================

/**
 * Get all products (public endpoint)
 */
export const getProducts = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_URL}/products${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get products error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Get product by ID or slug
 */
export const getProduct = async (identifier) => {
  try {
    const response = await fetch(`${API_URL}/products/${identifier}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get product error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// ==========================================
// CART (Backend API - Requires Auth)
// ==========================================

/**
 * Get user's cart
 */
export const getCart = async () => {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${API_URL}/cart`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get cart error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Add item to cart
 */
export const addToCart = async (cartItem) => {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${API_URL}/cart/items`, {
      method: 'POST',
      headers,
      body: JSON.stringify(cartItem),
    });

    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Add to cart error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Get cart item count
 */
export const getCartCount = async () => {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${API_URL}/cart/count`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cart count');
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get cart count error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// ==========================================
// CATEGORIES (Backend API)
// ==========================================

/**
 * Get all categories
 */
export const getCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get categories error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Get category by ID or slug
 */
export const getCategory = async (identifier) => {
  try {
    const response = await fetch(`${API_URL}/categories/${identifier}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch category');
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get category error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// ==========================================
// ORDERS (Backend API - Requires Auth)
// ==========================================

/**
 * Create a new order
 */
export const createOrder = async (orderData) => {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Create order error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Get user's orders
 */
export const getOrders = async () => {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${API_URL}/orders`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get orders error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Get order by ID
 */
export const getOrder = async (orderId) => {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get order error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export default {
  // Auth
  registerUser,
  loginUser,
  logoutUser,
  // Profile
  getUserProfile,
  updateUserProfile,
  // Products
  getProducts,
  getProduct,
  // Cart
  getCart,
  addToCart,
  getCartCount,
  // Categories
  getCategories,
  getCategory,
  // Orders
  createOrder,
  getOrders,
  getOrder,
};
