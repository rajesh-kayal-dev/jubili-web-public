import { useState, useCallback } from 'react';
import { userActionsService } from '@/services/userActions.service';
import { CartResponse } from '@/lib/types/cart';
import { useAuth } from './useAuth';

interface UseCartReturn {
  cart: CartResponse | null;
  loading: boolean;
  error: string | null;
  fetchCart: () => Promise<CartResponse | null>;
  refetch: () => Promise<void>;
}

export const useCart = (): UseCartReturn => {
  const { userId } = useAuth();
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async (): Promise<CartResponse | null> => {
    if (!userId) {
      setError('User not authenticated');
      setLoading(false);
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const cartData = await userActionsService.getCart(userId);
      setCart(cartData);
      return cartData;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Error fetching cart';
      setError(errorMessage);
      console.error('Error fetching cart:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const refetch = useCallback(async (): Promise<void> => {
    await fetchCart();
  }, [fetchCart]);

  return {
    cart,
    loading,
    error,
    fetchCart,
    refetch,
  };
};