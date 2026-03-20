import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ParkingSpot } from '../data/parkingData';

interface SpotListProps {
  spots: ParkingSpot[];
  onSpotPress: (spot: ParkingSpot) => void;
}

export default function SpotList({ spots, onSpotPress }: SpotListProps) {
  return (
    <>
      <Text style={styles.sectionTitle}>Parking Nearby</Text>
      <View style={styles.listContent}>
        {spots.map((spot) => (
          <TouchableOpacity key={spot.id} onPress={() => onSpotPress(spot)} activeOpacity={0.7}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{spot.name}</Text>
              <View style={[styles.badge, { backgroundColor: spot.color }]}>
                <Text style={styles.badgeText}>{spot.availability}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 10,
    color: '#000',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardTitle: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
