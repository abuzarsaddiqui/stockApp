import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';  // Import React Query client and provider
import { MarketProvider } from './src/context/marketContext'; // Import context provider for managing market data
import AppNavigator from './src/navigation/appNavigator'; // Import the app's navigation system

// Initialize the React Query client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    // Wrap the app with the QueryClientProvider to manage cache and data fetching
    <QueryClientProvider client={queryClient}> 
      {/* Provide the MarketContext to manage market data */}
      <MarketProvider>
        {/* AppNavigator handles navigation between screens */}
        <AppNavigator />
      </MarketProvider>
    </QueryClientProvider>
  );
};

export default App;
