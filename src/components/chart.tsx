import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart as RNLineChart } from "react-native-chart-kit"; // Rename imported LineChart



const ChartComponent: React.FC = () => (
  <View style={styles.container}>
    <RNLineChart
      data={{
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: Array.from({ length: 6 }, () => Math.random() * 100), // Generate 6 random numbers
          },
        ],
      }}
      width={Dimensions.get("window").width - 40} // Adjusted width for padding
      height={220}
      yAxisLabel="$"
      yAxisSuffix="k"
      yAxisInterval={1} // Optional, defaults to 1
      chartConfig={config}
      bezier
      style={styles.chart}
    />
  </View>
);
const config = {
  backgroundGradientFrom: "rgba(255, 255, 255, 0.1)",  // Light white with some transparency
  backgroundGradientFromOpacity: 0.2,                   // Low opacity for a frosted effect
  backgroundGradientTo: "rgba(255, 255, 255, 0.1)",    // Slightly more opaque white
  backgroundGradientToOpacity: 0.2,                     // Slightly higher opacity for the fade-out effect
  color: (opacity = 1) => `rgba(0, 150, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  withHorizontalLines: false,  // Removes horizontal lines
  withVerticalLines: false,    // Removes vertical lines
  useShadowColorFromDataset: false,
  withDots: false,             // Removes dotted lines
  propsForBackgroundLines: {
    strokeWidth: 0, // No background lines
  },
  style: {
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5, // Android shadow
  },
  propsForLabels: {
    fontSize: 12,
    fill: "green",
  },
  propsForYAxisLabels: {
    fontSize: 12,

    fill: "green",             // Y-axis labels green color
  },
  propsForDots: {
    r: "3",
    strokeWidth: "1",
    stroke: "rgba(255, 255, 255, 0.5)", // White outline
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Dark background for contrast
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
});


export default ChartComponent;