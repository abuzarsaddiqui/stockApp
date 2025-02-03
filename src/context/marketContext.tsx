import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { connectWebSocket } from '../service/websocket';
import { StockData } from '../types/stock';
import { fetchMarketData } from '../service/api';
import { debounce } from 'lodash'; // Import lodash for debouncing

interface MarketContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  marketData: StockData[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

/**
 * A provider component that fetches market data based on the search query
 * and shares it via context. It also provides a debounced search query update function.
 * 
 * @param {ReactNode} children - The components that consume the context.
 */

export const MarketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

// Debounce API calls to avoid excessive requests while typing
const debouncedSearchQuery = debounce((query: string) => setSearchQuery(query), 500);

  // Fetch market data using React Query & API service
  const { data: marketData, isLoading, isError, refetch } = useQuery<StockData[]>({
    queryKey: ['market', searchQuery], // Query updates when searchQuery changes
    queryFn: () => fetchMarketData(searchQuery),
    enabled: !!searchQuery, // Avoid fetching on an empty query
  });

  useEffect(() => {
    refetch(); // Refetch whenever searchQuery changes
  }, [searchQuery, refetch]);

  return (
    <MarketContext.Provider value={{
      searchQuery,
      setSearchQuery: debouncedSearchQuery,
      marketData,
      isLoading,
      isError
    }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = (): MarketContextType => {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
};