import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { createIssueReport, ParkingSpot } from '../data/parkingData';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReport = useCallback(async () => {
    if (!reportReason && !reportNotes) {
      Alert.alert("Error", "Please select a reason or provide some notes.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createIssueReport({
        parkingSpotId: spot.id,
        reason: reportReason ?? undefined,
        notes: reportNotes,
      });

      Alert.alert("Success", "Thank you for your report! We will review the information.", [
        { text: "OK", onPress: onSubmitSuccess }
      ]);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "Unable to submit report. Please try again.";
      Alert.alert("Error", message);
    } finally {
      setIsSubmitting(false);
    }
  }, [reportReason, reportNotes, onSubmitSuccess, spot.id]);

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
          disabled={isSubmitting}
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
        editable={!isSubmitting}
      />

      <TouchableOpacity
        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
        onPress={() => {
          void handleSubmitReport();
        }}
        disabled={isSubmitting}
      >
        <Text style={styles.submitButtonText}>
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </Text>
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
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
