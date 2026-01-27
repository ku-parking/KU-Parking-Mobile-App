import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline, UserLocationChangeEvent } from 'react-native-maps';
import { ParkingSpot } from '../data/parkingData';

interface ParkingMapProps {
    parkingSpots: ParkingSpot[];
    selectedSpot?: ParkingSpot | null;
    onSpotPress?: (spot: ParkingSpot) => void;
    onMapPress?: () => void;
}

export default function ParkingMap({ parkingSpots, selectedSpot, onSpotPress, onMapPress }: ParkingMapProps) {
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        })();
    }, []);

    const handleUserLocationChange = (event: UserLocationChangeEvent) => {
        const { coordinate } = event.nativeEvent;
        if (coordinate) {
            setUserLocation({
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
            });
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 13.8476, // Kasetsart University
                    longitude: 100.5696,
                    latitudeDelta: 0.012,
                    longitudeDelta: 0.012,
                }}
                showsUserLocation={true}
                userLocationAnnotationTitle="You are here"
                userLocationCalloutEnabled={true}
                userLocationPriority="high"
                onPress={() => onMapPress && onMapPress()}
                onUserLocationChange={handleUserLocationChange}
            >
                {selectedSpot && userLocation && (
                    <>
                        <Polyline
                            coordinates={[
                                userLocation,
                                { latitude: selectedSpot.latitude, longitude: selectedSpot.longitude }
                            ]}
                            strokeColor="#007AFF" // Blue like in screenshot
                            strokeWidth={4}
                        />
                        {/* Info Marker at midpoint */}
                        <Marker
                            coordinate={{
                                latitude: (userLocation.latitude + selectedSpot.latitude) / 2,
                                longitude: (userLocation.longitude + selectedSpot.longitude) / 2
                            }}
                        >
                            <View style={styles.routeTag}>
                                {/* Distance calculation would go here, hardcoded for now or use library */}
                                <Text style={styles.routeTagText}>🚗 ~2 min</Text>
                            </View>
                        </Marker>
                    </>
                )}

                {parkingSpots.map((spot) => (
                    <Marker
                        key={spot.id}
                        coordinate={{
                            latitude: spot.latitude,
                            longitude: spot.longitude,
                        }}
                        title={spot.name}
                        onPress={() => onSpotPress && onSpotPress(spot)}
                    >
                        <View style={[
                            styles.marker,
                            { backgroundColor: spot.color },
                            selectedSpot?.id === spot.id && styles.selectedMarker
                        ]}>
                            <Text style={styles.markerText}>{spot.availability}</Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    marker: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    selectedMarker: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 3,
    },
    markerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    routeTag: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
    },
    routeTagText: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    routeTagSubText: {
        fontSize: 10,
        color: '#666',
    },
});
