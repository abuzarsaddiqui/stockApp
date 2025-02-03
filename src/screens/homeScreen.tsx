import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useMarket } from '../context/marketContext';
import StockItem from '../components/stockItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import ChartComponent from '../components/chart';
import SearchBarComponent from '../components/searchBar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StockData } from '../types/stock';
import { RootStackParamList } from '../navigation/appNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import StackNavigationProp
import designSystem from '../styles';

// Define the navigation prop type for Home screen
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

/**
 * HomeScreen component displays the stock market data with search functionality,
 * charts, and navigation to a stock detail screen.
 * 
 * It includes:
 * - A search bar to filter stock symbols.
 * - A chart displaying market data.
 * - A list of filtered stock items with clickable rows that navigate to a detailed view.
 */
const HomeScreen: React.FC = () => {
  // Destructure market context values
  const { searchQuery, setSearchQuery, marketData, isLoading, isError } = useMarket();
  
  // Get navigation object to navigate between screens
  const navigation = useNavigation<HomeScreenNavigationProp>(); 

  /**
   * Handles search input changes and triggers the search.
   * 
   * @param query - The search query text entered by the user.
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Filter the market data based on the search query
  const filteredData = marketData?.filter((item) =>
    item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * Navigates to the StockDetail screen when a stock item is clicked.
   * 
   * @param stockData - The stock data to be passed to the detail screen.
   */
  const handleStockPress = (stockData: StockData) => {
    navigation.navigate('StockDetail', { stockData });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#131323', '#624B6A']}
        locations={[0, 1]}
        style={designSystem.gradientBackground}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Home</Text>
          <View style={styles.chartContainer}>
            <ChartComponent />
          </View>
          
          {/* Show loading indicator, error message, or the filtered stock list */}
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : isError ? (
            <Text>Error fetching data</Text>
          ) : (
            <FlatList
              data={filteredData}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleStockPress(item)}>
                  <StockItem item={item} />
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.flatListContainer}
              ListHeaderComponent={
                <>
                  <View style={styles.padding}>
                    <SearchBarComponent onSearch={handleSearch} />
                  </View>
                </>
              }
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No matching results found</Text>
              }
              stickyHeaderIndices={[0]}
              keyboardDismissMode="on-drag"
            />
          )}
        </SafeAreaView>
      </LinearGradient>
    </GestureHandlerRootView>
  );
};

// Styles for HomeScreen
const styles = StyleSheet.create({
  padding: {
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'flex-start',  // Align items vertically
  },
  separator: {
    height: 10,
    backgroundColor: 'transparent',
  },
  chartContainer: {
    height: 200,
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  flatListContainer: {
    backgroundColor: 'transparent',
  },
  header: {
    marginLeft: -20,
    ...designSystem.header,
  },
});

export default HomeScreen;
