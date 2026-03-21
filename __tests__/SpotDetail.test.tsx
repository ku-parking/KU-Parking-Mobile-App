import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SpotDetail from '../components/SpotDetail';
import { ParkingSpot } from '../data/parkingData';

const mockSpot: ParkingSpot = {
  id: 1,
  name: 'Sc KU Food Court',
  latitude: 13.845802,
  longitude: 100.570707,
  availability: 40,
  capacity: 40,
  updatedAt: '2026-03-21T08:10:00Z',
  color: '#2ecc71',
};

describe('SpotDetail Component', () => {
  it('renders the spot name', () => {
    const { getByText } = render(
      <SpotDetail spot={mockSpot} onClose={jest.fn()} onNavigate={jest.fn()} onReportIssue={jest.fn()} />
    );
    expect(getByText('Sc KU Food Court')).toBeTruthy();
  });

  it('renders unavailable last updated text when updatedAt is missing', () => {
    const { getByText } = render(
      <SpotDetail
        spot={{ ...mockSpot, updatedAt: undefined }}
        onClose={jest.fn()}
        onNavigate={jest.fn()}
        onReportIssue={jest.fn()}
      />
    );
    expect(getByText('Last updated: unavailable')).toBeTruthy();
  });

  it('renders formatted last updated text when updatedAt is provided', () => {
    const { getByText } = render(
      <SpotDetail spot={mockSpot} onClose={jest.fn()} onNavigate={jest.fn()} onReportIssue={jest.fn()} />
    );
    expect(getByText('Last updated: 21/03/2026 08:10')).toBeTruthy();
  });

  it('renders the availability badge with the correct number', () => {
    const { getByText } = render(
      <SpotDetail spot={mockSpot} onClose={jest.fn()} onNavigate={jest.fn()} onReportIssue={jest.fn()} />
    );
    expect(getByText('40')).toBeTruthy();
  });

  it('calls onClose when the Close button is pressed', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <SpotDetail spot={mockSpot} onClose={onClose} onNavigate={jest.fn()} onReportIssue={jest.fn()} />
    );
    fireEvent.press(getByText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onNavigate when the Navigate button is pressed', () => {
    const onNavigate = jest.fn();
    const { getByText } = render(
      <SpotDetail spot={mockSpot} onClose={jest.fn()} onNavigate={onNavigate} onReportIssue={jest.fn()} />
    );
    fireEvent.press(getByText('Navigate'));
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });

  it('calls onReportIssue when the report button is pressed', () => {
    const onReportIssue = jest.fn();
    const { getByText } = render(
      <SpotDetail spot={mockSpot} onClose={jest.fn()} onNavigate={jest.fn()} onReportIssue={onReportIssue} />
    );
    fireEvent.press(getByText('Report inaccurate information'));
    expect(onReportIssue).toHaveBeenCalledTimes(1);
  });
});
