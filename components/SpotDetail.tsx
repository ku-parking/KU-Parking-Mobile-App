import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ParkingSpot } from '../data/parkingData';

interface SpotDetailProps {
  spot: ParkingSpot;
  onClose: () => void;
  onNavigate: () => void;
  onReportIssue: () => void;
}

const formatLastUpdated = (updatedAt?: string | null): string => {
  const rawValue = typeof updatedAt === 'string' ? updatedAt.trim() : '';
  if (!rawValue) {
    return 'Last updated: unavailable';
  }

  const isoMatch = rawValue.match(
    /^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,6}))?)?(?:\s*(Z|([+-])(\d{2}):?(\d{2})))?$/
  );
  if (!isoMatch) {
    return `Last updated: ${rawValue}`;
  }

  const year = Number(isoMatch[1]);
  const month = Number(isoMatch[2]);
  const day = Number(isoMatch[3]);
  const hour = Number(isoMatch[4]);
  const minute = Number(isoMatch[5]);
  const second = Number(isoMatch[6] ?? '0');
  const fraction = (isoMatch[7] ?? '').padEnd(3, '0').slice(0, 3);
  const millisecond = Number(fraction || '0');
  const timezoneToken = isoMatch[8];

  let utcMs = Date.UTC(year, month - 1, day, hour, minute, second, millisecond);
  if (timezoneToken && timezoneToken !== 'Z') {
    const sign = isoMatch[9] === '-' ? -1 : 1;
    const offsetHours = Number(isoMatch[10] ?? '0');
    const offsetMinutes = Number(isoMatch[11] ?? '0');
    const offsetTotalMinutes = sign * (offsetHours * 60 + offsetMinutes);
    utcMs -= offsetTotalMinutes * 60 * 1000;
  }

  const bangkokMs = utcMs + 7 * 60 * 60 * 1000;
  const bangkokDate = new Date(bangkokMs);
  const displayDay = String(bangkokDate.getUTCDate()).padStart(2, '0');
  const displayMonth = String(bangkokDate.getUTCMonth() + 1).padStart(2, '0');
  const displayYear = String(bangkokDate.getUTCFullYear());
  const displayHour = String(bangkokDate.getUTCHours()).padStart(2, '0');
  const displayMinute = String(bangkokDate.getUTCMinutes()).padStart(2, '0');
  return `Last updated: ${displayDay}/${displayMonth}/${displayYear} ${displayHour}:${displayMinute} ICT`;
};

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
        <Text style={styles.detailInfoText}>{formatLastUpdated(spot.updatedAt)}</Text>
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
