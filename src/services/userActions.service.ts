import { API_BASE_URL, API_ENDPOINTS } from '@/lib/constants/api';
import { CartResponse } from '@/lib/types/cart';

class UserActionsService {
  async getCart(userId: string): Promise<CartResponse> {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.USER_ACTIONS.CART(userId)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      return response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Error fetching cart');
    }
  }
}

export const userActionsService = new UserActionsService();
