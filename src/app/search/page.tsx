// File: src/app/search/page.tsx
'use client';

import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/lib/types/product';
import { searchProducts } from '@/services/product.service';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

// Separate component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const products = await searchProducts(query || '', token || undefined);
        setResults(products);
      } catch (error) {
        console.error('Error fetching search results:', error);
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
  }, [query, token]);

  return (
    <div className="container mx-auto">
      {isLoading ? (  
        <div className="flex h-full items-center justify-center py-12">
          <img src="/icons/loading.svg" alt="Loading..." className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div>
          {query ? (
            results.length > 0 ? (
              <div className="flex flex-col mt-0">
                {results.map((product) => (
                  <ProductCard key={product.productId} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No results found for &quot;{query}&quot;</p>
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
  );
}

// Main component with Suspense boundary
export default function SearchPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="flex h-full items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      }>
        <SearchContent />
      </Suspense>
    </>
  );
}