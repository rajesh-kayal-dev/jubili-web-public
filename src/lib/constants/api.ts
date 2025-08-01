export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/users/login',
    REGISTER: '/api/users/signup',
    LOGOUT: '/api/users/logout',
  },
  PRODUCTS: {
    SEARCH: '/api/products/search-products',
  },
} as const;
