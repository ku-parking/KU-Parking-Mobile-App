import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Linking, Platform } from "react-native";
import ParkingMap from "../components/ParkingMap";
import { ParkingSpot, parkingSpots } from "../data/parkingData";
import SearchBar from "../components/SearchBar";
import SpotList from "../components/SpotList";
import SpotDetail from "../components/SpotDetail";
import ReportIssue from "../components/ReportIssue";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [isReporting, setIsReporting] = useState(false);

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
    console.log("handleSpotPress", spot);
    setIsReporting(false);
    bottomSheetRef.current?.expand(); // Open the sheet when a spot is clicked
  }, []);

  const handleMapPress = useCallback(() => {
    setSelectedSpot(null);
    console.log("handleMapPress");
    setIsReporting(false);
    bottomSheetRef.current?.collapse(); // Minimize the sheet when map is clicked
  }, []);

  const handleNavigate = useCallback(() => {
    if (!selectedSpot) return;
    const latLng = `${selectedSpot.latitude},${selectedSpot.longitude}`;

    if (Platform.OS === 'android') {
      Linking.openURL(`google.navigation:q=${latLng}`);
    } else {
      Linking.openURL(`maps://app?daddr=${latLng}`);
    }
  }, [selectedSpot]);

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
      <SearchBar 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
        searchResults={filteredSpots}
        onSpotSelect={handleSpotPress}
      />

      {/* Minimizable Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        index={1} // Start expanded (or 0 for minimized)
        backgroundStyle={styles.bottomSheetBackground}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {selectedSpot ? (
            isReporting ? (
              <ReportIssue 
                spot={selectedSpot} 
                onCancel={() => setIsReporting(false)} 
                onSubmitSuccess={() => setIsReporting(false)} 
              />
            ) : (
              <SpotDetail 
                spot={selectedSpot} 
                onClose={() => setSelectedSpot(null)} 
                onNavigate={handleNavigate} 
                onReportIssue={() => setIsReporting(true)} 
              />
            )
          ) : (
            <SpotList spots={filteredSpots} onSpotPress={handleSpotPress} />
          )}
        </BottomSheetScrollView>
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
    flexGrow: 1,
  },
});

