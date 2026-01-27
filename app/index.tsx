import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ParkingMap from "../components/ParkingMap";
import { ParkingSpot, parkingSpots } from "../data/parkingData";

const { height } = Dimensions.get('window');

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['15%', '45%'], []);

  const filteredSpots = useMemo(() => {
    if (!searchQuery) return parkingSpots;
    return parkingSpots.filter(spot =>
      spot.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSpotPress = useCallback((spot: ParkingSpot) => {
    setSelectedSpot(spot);
    bottomSheetRef.current?.expand(); // Open the sheet when a spot is clicked
  }, []);

  const handleMapPress = useCallback(() => {
    setSelectedSpot(null);
    bottomSheetRef.current?.collapse(); // Minimize the sheet when map is clicked
  }, []);

  const renderItem = useCallback(({ item }: { item: ParkingSpot }) => (
    <TouchableOpacity onPress={() => handleSpotPress(item)} activeOpacity={0.7}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={[styles.badge, { backgroundColor: item.color }]}>
          <Text style={styles.badgeText}>{item.availability}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ), [handleSpotPress]);

  return (
    <View style={styles.container}>
      {/* Map Background */}
      <View style={styles.mapContainer}>
        <ParkingMap
          parkingSpots={filteredSpots}
          selectedSpot={selectedSpot}
          onSpotPress={handleSpotPress}
          onMapPress={handleMapPress}
        />
      </View>

      {/* Floating Search Bar */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#888"
          />
        </View>
      </SafeAreaView>

      {/* Minimizable Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        index={1} // Start expanded (or 0 for minimized)
        backgroundStyle={styles.bottomSheetBackground}
      >
        <BottomSheetView style={styles.contentContainer}>
          {selectedSpot ? (
            <View style={styles.detailContainer}>
              <View style={styles.detailHeader}>
                <Text style={styles.detailTitle}>{selectedSpot.name}</Text>
                <TouchableOpacity onPress={() => setSelectedSpot(null)}>
                  <Text style={{ color: '#999', fontSize: 16 }}>Close</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.detailRow}>
                <View style={[styles.detailBadge, { backgroundColor: selectedSpot.color }]}>
                  <Text style={styles.detailBadgeText}>{selectedSpot.availability}</Text>
                </View>
                <Text style={styles.detailInfoText}>Parking Available at 9:40</Text>
              </View>

              <TouchableOpacity style={styles.reportButton}>
                <Text style={styles.reportButtonText}>Report inaccurate information</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.sectionTitle}>Parking Nearby</Text>
              <BottomSheetScrollView contentContainerStyle={styles.listContent}>
                {filteredSpots.map((spot) => (
                  <TouchableOpacity key={spot.id} onPress={() => handleSpotPress(spot)} activeOpacity={0.7}>
                    <View style={styles.card}>
                      <Text style={styles.cardTitle}>{spot.name}</Text>
                      <View style={[styles.badge, { backgroundColor: spot.color }]}>
                        <Text style={styles.badgeText}>{spot.availability}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </BottomSheetScrollView>
            </>
          )}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
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
  searchInput: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  bottomSheetBackground: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
  },
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
  detailContainer: {
    padding: 16,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  detailBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  detailInfoText: {
    fontSize: 16,
    color: '#333',
  },
  reportButton: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  reportButtonText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    alignItems: 'center',
    padding: 10,
  },
});

