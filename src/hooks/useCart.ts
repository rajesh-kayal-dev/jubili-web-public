import { useState } from 'react';
import { userActionsService } from '@/services/userActions.service';
import { CartResponse } from '@/lib/types/cart';
import { useAuth } from './useAuth';

export const useCart = () => {
  const { userId } = useAuth();
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchCart = async () => {
    if (!userId) {
      setError('User not authenticated');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const cartData = await userActionsService.getCart(userId);
      setCart(cartData);
      return cartData;
    } catch (err: any) {
      setError(err.message || 'Error fetching cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    cart,
    loading,
    error,
    fetchCart,
  };
};
