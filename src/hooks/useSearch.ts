import { useState, useCallback, useEffect } from 'react';
import { Product } from '@/lib/types/product';
import { searchProducts } from '@/services/product.service';

export function useSearch(query: string | null, token?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchSearchResults = useCallback(async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const products = await searchProducts(searchQuery, token);
      setResults(products);
    } catch (error) {
      console.error('Error fetching search results:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred while searching';
      setError(errorMessage);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (query?.trim()) {
      fetchSearchResults(query);
    } else {
      setResults([]);
      setError(null);
    }
  }, [query, fetchSearchResults]);

  const handleLikeToggle = useCallback((productId: string, isLiked: boolean) => {
    setResults(prevResults => 
      prevResults.map(product => 
        product.productId === productId 
          ? { 
              ...product, 
              isLiked, 
              likeCount: isLiked ? product.likeCount + 1 : product.likeCount - 1 
            }
          : product
      )
    );
  }, []);

  return {
    isLoading,
    results,
    error,
    handleLikeToggle,
    retry: () => query?.trim() ? fetchSearchResults(query) : undefined
  };
}
