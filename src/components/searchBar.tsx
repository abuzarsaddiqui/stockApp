import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

/**
 * A search bar component that takes user input and triggers a search function.
 * @param {function} onSearch - Optional callback function to handle search input changes.
 */
interface SearchBarProps {
  onSearch?: (text: string) => void;
}

const SearchBarComponent: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState(''); // Track the current search query

  // Handles the text input changes
  const handleSearch = (text: string) => {
    setQuery(text); // Update the local query state
    if (onSearch) {
      onSearch(text); // Call the optional onSearch callback with the new text
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Here..."
        placeholderTextColor="#444"
        value={query} // Set the value to the current query state
        onChangeText={handleSearch} // Trigger the handleSearch function on text change
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
    borderRadius: 8, // Rounded corners
    paddingHorizontal: 10,
  },
  input: {
    flex: 1, // Take available space
    height: 40,
    fontSize: 13,
    color: '#444', // Input text color
  },
});

export default SearchBarComponent;
