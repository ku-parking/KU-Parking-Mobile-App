export const Config = {
    colorThresholds: {
        green: 0.7,  // >= 50% available
        yellow: 0.30 // >= 15% available (below green)
        // Anything below the yellow threshold defaults to red (< 15%)
    }
};
