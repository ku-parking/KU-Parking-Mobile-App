import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { ParkingSpot } from '../data/parkingData';

const REPORT_REASONS = [
  "Availability does not match",
  "Wrong location",
  "Lot is closed",
  "Other"
];

interface ReportIssueProps {
  spot: ParkingSpot;
  onCancel: () => void;
  onSubmitSuccess: () => void;
}

export default function ReportIssue({ spot, onCancel, onSubmitSuccess }: ReportIssueProps) {
  const [reportReason, setReportReason] = useState<string | null>(null);
  const [reportNotes, setReportNotes] = useState('');

  const handleSubmitReport = useCallback(() => {
    if (!reportReason && !reportNotes) {
      Alert.alert("Error", "Please select a reason or provide some notes.");
      return;
    }
    // Simulate API call
    Alert.alert("Success", "Thank you for your report! We will review the information.", [
      { text: "OK", onPress: onSubmitSuccess }
    ]);
  }, [reportReason, reportNotes, onSubmitSuccess]);

  return (
    <View style={styles.reportContainer}>
      <View style={styles.detailHeader}>
        <Text style={styles.detailTitle}>Report Issue</Text>
        <TouchableOpacity onPress={onCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.reportSubtitle}>Select a reason for {spot.name}:</Text>

      {REPORT_REASONS.map((reason) => (
        <TouchableOpacity
          key={reason}
          style={styles.radioContainer}
          onPress={() => setReportReason(reason)}
          activeOpacity={0.7}
        >
          <View style={[styles.outerRadio, reportReason === reason && styles.outerRadioSelected]}>
            {reportReason === reason && <View style={styles.innerRadio} />}
          </View>
          <Text style={styles.radioText}>{reason}</Text>
        </TouchableOpacity>
      ))}

      <TextInput
        style={styles.notesInput}
        placeholder="Additional details (optional)"
        value={reportNotes}
        onChangeText={setReportNotes}
        multiline
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReport}>
        <Text style={styles.submitButtonText}>Submit Report</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  reportContainer: {
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
  cancelText: {
    color: '#999',
    fontSize: 16,
  },
  reportSubtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  outerRadio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  outerRadioSelected: {
    borderColor: '#007AFF',
  },
  innerRadio: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    marginBottom: 20,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
