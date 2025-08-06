'use client';

import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/lib/types/product';
import { searchProducts } from '@/services/product.service';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex h-full items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
}

// Error component
function ErrorMessage({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="text-center py-12">
      <p className="text-red-600 mb-4">{error}</p>
      <button 
        onClick={onRetry}
        className="text-blue-500 underline hover:text-blue-700"
      >
        Try again
      </button>
    </div>
  );
}

// Separate component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const { token } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchSearchResults = useCallback(async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const products = await searchProducts(searchQuery, token || undefined);
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
      setIsLoading(false);
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

  const handleRetry = useCallback(() => {
    if (query?.trim()) {
      fetchSearchResults(query);
    }
  }, [query, fetchSearchResults]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Search query display */}
      {query && (
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Search Results for &quot;{query}&quot;
          </h1>
          {!isLoading && !error && (
            <p className="text-sm text-gray-600 mt-1">
              {results.length} {results.length === 1 ? 'product' : 'products'} found
            </p>
          )}
        </div>
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage error={error} onRetry={handleRetry} />
      ) : (
        <div>
          {query ? (
            results.length > 0 ? (
              <div className="flex flex-col space-y-6">
                {results.map((product) => (
                  <ProductCard 
                    key={product.productId} 
                    product={product}
                    onLikeToggle={handleLikeToggle}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mb-4">
                  <svg 
                    className="mx-auto h-12 w-12 text-gray-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291.94-5.709 2.291M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg mb-2">
                  No results found for &quot;{query}&quot;
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Try searching with different keywords or check your spelling
                </p>
                <button 
                  onClick={() => window.history.back()}
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  Go back
                </button>
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <div className="mb-4">
                <svg 
                  className="mx-auto h-12 w-12 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">
                Enter a search term to see results
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Main component with Suspense boundary
export default function SearchPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <SearchContent />
      </Suspense>
    </>
  );
}