import { Product, LikedProduct, transformLikedProductToProduct } from '@/lib/types/product';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/constants/api';

/**
 * Search for products by name
 */
export const searchProducts = async (query: string, token?: string): Promise<Product[]> => {
  if (!query.trim()) {
    return [];
  }

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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data: Product[] = await response.json();
    
    // Ensure imageUrls is always an array
    return data.map(product => ({
      ...product,
      imageUrls: Array.isArray(product.imageUrls) 
        ? product.imageUrls 
        : typeof product.imageUrls === 'string' 
          ? [product.imageUrls] 
          : []
    }));
  } catch (error) {
    console.error('Error searching products:', error);
    throw error instanceof Error 
      ? error 
      : new Error('An unexpected error occurred while searching products');
  }
};

/**
 * Get user's liked products
 */
export const getLikedProducts = async (token: string): Promise<Product[]> => {
  if (!token) {
    throw new Error('Authentication token is required');
  }

  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USER_ACTIONS.LIKED_PRODUCTS}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data: LikedProduct[] = await response.json();
    
    // Transform liked products to match Product interface
    return data.map(transformLikedProductToProduct);
  } catch (error) {
    console.error('Error fetching liked products:', error);
    throw error instanceof Error 
      ? error 
      : new Error('An unexpected error occurred while fetching liked products');
  }
};

/**
 * Toggle product like status
 */
export const toggleProductLike = async (
  productId: string, 
  token: string
): Promise<{ message: string }> => {
  if (!productId) {
    throw new Error('Product ID is required');
  }
  
  if (!token) {
    throw new Error('Authentication token is required');
  }

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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error toggling product like:', error);
    throw error instanceof Error 
      ? error 
      : new Error('An unexpected error occurred while toggling product like');
  }
};