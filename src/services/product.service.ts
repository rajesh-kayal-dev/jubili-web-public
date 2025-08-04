import { Product } from '@/lib/types/product';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/constants/api';

export const searchProducts = async (query: string, token?: string): Promise<Product[]> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS.SEARCH}?productName=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }

    const data = await response.json();
    console.log(data);
    
    return data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

export const getLikedProducts = async (token: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USER_ACTIONS.LIKED_PRODUCTS}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch liked products');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching liked products:', error);
    throw error;
  }
};

export const toggleProductLike = async (productId: string, token: string): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCTS.LIKE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId })
    });

    if (!response.ok) {
      throw new Error('Failed to toggle product like');
    }

    return await response.json();
  } catch (error) {
    console.error('Error toggling product like:', error);
    throw error;
  }
};
