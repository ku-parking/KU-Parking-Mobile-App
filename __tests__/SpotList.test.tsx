import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SpotList from '../components/SpotList';
import { ParkingSpot } from '../data/parkingData';

const mockSpots: ParkingSpot[] = [
  { id: 1, name: 'Sc KU Food Court', latitude: 13.845802, longitude: 100.570707, availability: 40, capacity: 40, color: '#2ecc71' },
  { id: 2, name: 'Thai Post Office', latitude: 13.847130, longitude: 100.568588, availability: 7, capacity: 35, color: '#f1c40f' },
];

describe('SpotList Component', () => {
  it('renders the section title "Parking Nearby"', () => {
    const { getByText } = render(
      <SpotList spots={mockSpots} onSpotPress={jest.fn()} />
    );
    expect(getByText('Parking Nearby')).toBeTruthy();
  });

  it('renders all spot names', () => {
    const { getByText } = render(
      <SpotList spots={mockSpots} onSpotPress={jest.fn()} />
    );
    expect(getByText('Sc KU Food Court')).toBeTruthy();
    expect(getByText('Thai Post Office')).toBeTruthy();
  });

  it('renders nothing when spots array is empty (no spot cards)', () => {
    const { queryByText } = render(
      <SpotList spots={[]} onSpotPress={jest.fn()} />
    );
    expect(queryByText('Sc KU Food Court')).toBeNull();
  });

  it('calls onSpotPress with the correct spot when a card is pressed', () => {
    const onSpotPress = jest.fn();
    const { getByText } = render(
      <SpotList spots={mockSpots} onSpotPress={onSpotPress} />
    );
    fireEvent.press(getByText('Sc KU Food Court'));
    expect(onSpotPress).toHaveBeenCalledTimes(1);
    expect(onSpotPress).toHaveBeenCalledWith(mockSpots[0]);
  });
});
