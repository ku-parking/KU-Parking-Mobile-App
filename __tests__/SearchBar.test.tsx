import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from '../components/SearchBar';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => children,
}));

describe('SearchBar Component', () => {
  const mockSpots = [
    {
      id: 1,
      name: 'Central Parking',
      latitude: 1,
      longitude: 1,
      availability: 50,
      color: 'green',
      capacity: 100
    }
  ];
  
  it('renders correctly with placeholder', () => {
    const onSearchChange = jest.fn();
    const onSpotSelect = jest.fn();

    const { getByPlaceholderText } = render(
      <SearchBar 
        searchQuery="" 
        onSearchChange={onSearchChange} 
        searchResults={mockSpots} 
        onSpotSelect={onSpotSelect} 
      />
    );

    expect(getByPlaceholderText('Search')).toBeTruthy();
  });

  it('calls onSearchChange when text is typed', () => {
    const onSearchChange = jest.fn();
    
    const { getByPlaceholderText } = render(
      <SearchBar 
        searchQuery="" 
        onSearchChange={onSearchChange} 
        searchResults={mockSpots} 
        onSpotSelect={jest.fn()} 
      />
    );

    const input = getByPlaceholderText('Search');
    fireEvent.changeText(input, 'Central');
    
    expect(onSearchChange).toHaveBeenCalledWith('Central');
  });
});
