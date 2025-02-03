import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, type StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/homeScreen';
import StockDetailScreen from '../screens/stockDetailScreen';
import { MarketData } from '../types/market';
import { StyleSheet, Text } from 'react-native';
import { StockData } from '../types/stock';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Define navigation stack types
/**
 * Defines the parameter list for the navigation stack.
 * 
 * - `Home`: No parameters.
 * - `StockDetail`: Takes `stockData` of type `StockData`.
 */
export type RootStackParamList = {
  Home: undefined;  // No parameters for Home screen
  StockDetail: { stockData: StockData };  // Parameters for StockDetail screen
};

// Create the stack navigator instance with type information
const Stack = createNativeStackNavigator<RootStackParamList>();  // Type the stack navigator

/**
 * AppNavigator component that sets up the navigation container and screens.
 * 
 * - `Home`: Displays the home screen, which is the initial screen.
 * - `StockDetail`: Displays the stock details screen with the selected stock data.
 */
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"  // Set Home screen as the initial screen
        screenOptions={{
          headerShown: false,  // Hide the header by default
          headerTransparent: true,  // Make header transparent if needed
          headerShadowVisible: false,  // Disable header shadow
          headerTitle: '',  // No title in the header
        }}
      >
        {/* Home screen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => <Text style={styles.headerText}>My App</Text>,  // Custom header title for Home screen
          }}
        />
        
        {/* Stock detail screen */}
        <Stack.Screen
          name="StockDetail"
          component={StockDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles for header text
const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  }
});

export default AppNavigator;
