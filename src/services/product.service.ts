import { Product } from '@/lib/types/product';
import { API_BASE_URL } from '@/lib/constants/api';

export const searchProducts = async (query: string, token?: string): Promise<Product[]> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(
      `${API_BASE_URL}/api/products/search-products?productName=${encodeURIComponent(query)}`,
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

export const toggleProductLike = async (productId: string, token: string): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/like`, {
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
