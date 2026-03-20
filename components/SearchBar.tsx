import React, { useState } from 'react';
import { StyleSheet, TextInput, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ParkingSpot } from '../data/parkingData';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchResults: ParkingSpot[];
  onSpotSelect: (spot: ParkingSpot) => void;
}

export default function SearchBar({ searchQuery, onSearchChange, searchResults, onSpotSelect }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const showDropdown = isFocused && searchQuery.length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.searchContainer, showDropdown && styles.searchContainerActive]}>
        <TextInput
          style={[styles.searchInput, showDropdown && styles.searchInputActive]}
          placeholder="Search"
          value={searchQuery}
          onChangeText={onSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // Delay closing so that onPress of the item can fire
            setTimeout(() => setIsFocused(false), 200);
          }}
          placeholderTextColor="#888"
        />
        {showDropdown && (
          <View style={styles.dropdownContainer}>
             {searchResults.length > 0 ? (
                <FlatList
                  data={searchResults}
                  keyExtractor={(item) => item.id.toString()}
                  keyboardShouldPersistTaps="handled"
                  style={{ maxHeight: 200 }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => {
                        onSpotSelect(item);
                        setIsFocused(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{item.name}</Text>
                      <View style={[styles.badge, { backgroundColor: item.color }]}>
                         <Text style={styles.badgeText}>{item.availability}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
             ) : (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResultsText}>No parking areas found</Text>
                </View>
             )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  searchContainer: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainerActive: {
    // optional tweaks when active
  },
  searchInput: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  searchInputActive: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  dropdownContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  noResultsContainer: {
    padding: 16,
    alignItems: 'center',
  },
  noResultsText: {
    color: '#888',
    fontSize: 14,
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
});
