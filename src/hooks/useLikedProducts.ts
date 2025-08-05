import { useState, useEffect } from 'react';
import { Product } from '@/lib/types/product';
import { getLikedProducts, toggleProductLike } from '@/services/product.service';
import { useAuth } from './useAuth';

interface UseLikedProductsReturn {
  likedProducts: Product[];
  loading: boolean;
  error: string | null;
  handleUnlike: (productId: string) => Promise<void>;

}

export const useLikedProducts = (): UseLikedProductsReturn => {
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchLikedProducts = async () => {
      if (!token) {
        setError('Please login to view liked products');
        setLoading(false);
        return;
      }

      try {
        const data = await getLikedProducts(token);
        setLikedProducts(data || []);
        setError(null);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch liked products';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProducts();
  }, [token]);

  const handleUnlike = async (productId: string) => {
    if (!token) {
      setError('Please login to unlike products');
      return;
    }

    try {
      await toggleProductLike(productId, token);
      setLikedProducts((prev) => prev.filter((item) => item.productId !== productId));
      setError(null);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to unlike product';
      setError(errorMessage);
    }
  };



  return {
    likedProducts,
    loading,
    error,
    handleUnlike
  };
};
