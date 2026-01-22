import config from './config';

// Get stored JWT token
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Set JWT token in localStorage
export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// Remove JWT token from localStorage
export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// Generic API request function
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${config.API_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Add authorization header if token exists
  const token = getToken();
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const config = {
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  };

  // Convert body to JSON if it's an object
  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);

    // Handle different response types
    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      // Handle authentication errors
      if (response.status === 401) {
        removeToken();
        // You might want to redirect to login page here
      }

      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication API functions
export const authAPI = {
  // Login user
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
  },

  // Register user
  register: async (name, email, password, phone) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: { name, email, password, phone },
    });
  },

  // Get user profile
  getProfile: async () => {
    return apiRequest('/auth/profile');
  },

  // Update user profile
  updateProfile: async (userData) => {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: userData,
    });
  },
};

// Properties API functions
export const propertiesAPI = {
  // Get all properties
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/properties?${queryString}` : '/properties';
    return apiRequest(endpoint);
  },

  // Get property by ID
  getById: async (id) => {
    return apiRequest(`/properties/${id}`);
  },

  // Get property statistics
  getStats: async () => {
    return apiRequest('/properties/stats');
  },
};

export default {
  authAPI,
  propertiesAPI,
  getToken,
  setToken,
  removeToken,
};