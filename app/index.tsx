import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Linking, Platform, Alert } from "react-native";
import ParkingMap from "../components/ParkingMap";
import { ParkingSpot, parkingSpots, fetchParkingSpots } from "../data/parkingData";
import { Config } from "../config";
import SearchBar from "../components/SearchBar";
import SpotList from "../components/SpotList";
import SpotDetail from "../components/SpotDetail";
import ReportIssue from "../components/ReportIssue";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [isReporting, setIsReporting] = useState(false);
  const [spots, setSpots] = useState<ParkingSpot[]>(parkingSpots);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['15%', '45%'], []);

  useEffect(() => {
    let isMounted = true;

    const loadParkingSpots = async () => {
      try {
        const remoteSpots = await fetchParkingSpots();
        if (isMounted) {
          setSpots(remoteSpots);
        }
      } catch (error) {
        console.warn('Using fallback parking data:', error);
        Alert.alert(
          'Offline data',
          `Unable to load live parking data from ${Config.apiBaseUrl}, showing fallback spots.`
        );
      }
    };

    loadParkingSpots();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredSpots = useMemo(() => {
    if (!searchQuery) return spots;
    return spots.filter(spot =>
      spot.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, spots]);

  const handleSpotPress = useCallback((spot: ParkingSpot) => {
    setSelectedSpot(spot);
    setIsReporting(false);
    bottomSheetRef.current?.expand(); // Open the sheet when a spot is clicked
  }, []);

  const handleMapPress = useCallback(() => {
    setSelectedSpot(null);
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

