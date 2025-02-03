import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/appNavigator';
import LinearGradient from 'react-native-linear-gradient';
import designSystem from '../styles';

// Type for route prop to ensure correct parameter structure
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'StockDetail'>;

// StockDetailScreen component receiving route prop to access stock data
const StockDetailScreen = ({ route }: { route: DetailScreenRouteProp }) => {
  // Destructure stockData from route params
  const { stockData } = route.params;

  // Prepare an array to display stock data items in a structured way
  const stockDataItems = [
    { label: 'Symbol', value: stockData.symbol },
    { label: 'Open', value: stockData.open.toString() },
    { label: 'Close', value: stockData.close.toString() },
    { label: 'Volume', value: stockData.volume.toString() },
  ];

  return (
    <LinearGradient
      // Gradient background for the screen
      colors={['#131323', '#624B6A']}
      locations={[0, 1]}
      style={designSystem.gradientBackground}
    >
      <SafeAreaView style={styles.container}>
      <Text style={designSystem.header}>Stock Details</Text>
      <View style={styles.centerGrid}>
          <View style={styles.gridContainer}>
            {/* Dynamically create boxes for each data point */}
            {stockDataItems.map((item, index) => (
              <View key={index} style={styles.box}>
                <Text style={styles.boxLabel}>{item.label}</Text>
                <Text style={styles.boxValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
};

// Styling for the screen and elements
const styles = StyleSheet.create({
  // Container for the grid layout of stock data boxes
  gridContainer: {
    flexDirection: 'row', // Align items in rows
    flexWrap: 'wrap', // Allow wrapping to the next line
    justifyContent: 'space-between', // Space out the items evenly
    padding: 10,
  },
  centerGrid: {
    flex: 0.5,
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center'
  },
  // Style for each box containing stock data
  box: {
    backgroundColor: '#131323', // Dark background color for each box
    borderRadius: 8, // Rounded corners
    width: '48%', // Each box takes up 48% of the container width (2 per row)
    padding: 20, // Padding inside the box
    marginBottom: 10, // Space between boxes
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    opacity: 0.8, // Set opacity for a slight transparency effect
  },

  // Label styling inside the boxes
  boxLabel: {
    fontSize: 19, // Font size for labels
    fontWeight: 'bold', // Bold label text
    color: 'white', // White text color
  },

  // Value text styling inside the boxes
  boxValue: {
    paddingTop: 10, // Space between label and value
    fontSize: 16, // Font size for values
    color: 'white', // White text color
  },

  // SafeAreaView container styling
  container: {
    flex: 1, // Take up all available space

  },

});

export default StockDetailScreen;
