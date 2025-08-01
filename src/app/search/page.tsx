'use client';

import Navbar from '@/components/layout/Navbar';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace this with your actual API call
        // const response = await fetch(`/api/search?q=${query}`);
        // const data = await response.json();
        // setResults(data);
        
        // Placeholder: Remove this when implementing actual search
        await new Promise(resolve => setTimeout(resolve, 1000));
        setResults([]);
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
                {results.map((result, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    {/* Replace this with your actual result card implementation */}
                    <p>Search result item {index + 1}</p>
                  </div>
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
