import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StockData } from '../types/stock';

/**
 * StockItem component to display individual stock details in a gradient card.
 * @param {StockData} item - The stock data to display (symbol, low/high prices, volume, date).
 */
interface StockItemProps {
  item: StockData;
}

const StockItem: React.FC<StockItemProps> = ({ item }) => (
  <LinearGradient
    colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.2)']}
    locations={[0, 0.9, 1]}
    style={styles.itemContainer}
  >
    <View style={styles.leftColumn}>
      <Text style={styles.tickerText}>{item.symbol}</Text>
      <Text style={styles.nameText}>L ${item.low}</Text>
      <Text style={styles.timestampText}>{item.date}</Text>
    </View>
    <View style={styles.rightColumn}>
      <Text style={styles.amountText}>H ${item.high}</Text>
      <Text style={styles.nameText}>Vol. {item.volume}</Text>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tickerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
  },
  nameText: {
    fontSize: 14,
    color: '#444444',
  },
  timestampText: {
    fontSize: 12,
    color: '#444444',
  },
  amountText: {
    fontSize: 16,
    color: '#999',
  }
});

export default StockItem;
