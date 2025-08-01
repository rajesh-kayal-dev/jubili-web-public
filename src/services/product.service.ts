import { Product } from '@/lib/types/product';
import { API_BASE_URL } from '@/lib/constants/api';

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/products/search-products?productName=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};
