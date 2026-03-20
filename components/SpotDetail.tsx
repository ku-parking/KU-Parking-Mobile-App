import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ParkingSpot } from '../data/parkingData';

interface SpotDetailProps {
  spot: ParkingSpot;
  onClose: () => void;
  onNavigate: () => void;
  onReportIssue: () => void;
}

export default function SpotDetail({ spot, onClose, onNavigate, onReportIssue }: SpotDetailProps) {
  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailHeader}>
        <Text style={styles.detailTitle}>{spot.name}</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailRow}>
        <View style={[styles.detailBadge, { backgroundColor: spot.color }]}>
          <Text style={styles.detailBadgeText}>{spot.availability}</Text>
        </View>
        <Text style={styles.detailInfoText}>Parking Available at 9:40</Text>
      </View>

      <TouchableOpacity style={styles.navigateButton} onPress={onNavigate}>
        <Text style={styles.navigateButtonText}>Navigate</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.reportButton} onPress={onReportIssue}>
        <Text style={styles.reportButtonText}>Report inaccurate information</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  closeText: {
    color: '#999',
    fontSize: 16,
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
  navigateButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  navigateButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
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
});
