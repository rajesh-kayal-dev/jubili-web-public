'use client';

import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/lib/types/product';
import { searchProducts } from '@/services/product.service';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const products = await searchProducts(query || '');
        setResults(products);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError('Failed to fetch search results. Please try again.');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setIsLoading(false);
      setResults([]);
    }
  }, [query]);

  return (
    <>
    <Navbar />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        {query ? `Search results for "${query}"` : 'Search'}
      </h1>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div>
          {query ? (
            results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((product) => (
                  <ProductCard key={product.productId} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No results found for "{query}"</p>
                <p className="text-sm text-gray-500 mt-2">Try searching with different keywords</p>
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Enter a search term to see results</p>
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
}
