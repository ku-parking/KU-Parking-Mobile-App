import { getSpotColor } from '../data/parkingData';

describe('getSpotColor utility', () => {
  it('returns green when availability ratio is >= 0.7 (high availability)', () => {
    // 70% full -> 30 available out of 40 won't be green. 
    // "green" means >= 70% of capacity is still available.
    expect(getSpotColor(40, 40)).toBe('#2ecc71'); // 100% available -> green
    expect(getSpotColor(28, 40)).toBe('#2ecc71'); // 70% available -> green
  });

  it('returns yellow when availability ratio is between 0.30 and 0.70', () => {
    expect(getSpotColor(12, 40)).toBe('#f1c40f'); // 30% available -> yellow
    expect(getSpotColor(15, 40)).toBe('#f1c40f'); // 37.5% available -> yellow
  });

  it('returns red when availability ratio is < 0.30 (almost full)', () => {
    expect(getSpotColor(0, 40)).toBe('#e74c3c');  // 0% available -> red
    expect(getSpotColor(5, 40)).toBe('#e74c3c');  // 12.5% available -> red
  });

  it('returns red fallback when capacity is 0 (to avoid divide-by-zero)', () => {
    expect(getSpotColor(0, 0)).toBe('#e74c3c');
  });
});
