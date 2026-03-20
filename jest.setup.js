import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});


jest.mock('react-native-maps', () => {
  const React = require('react');
  const MapView = ({ children, ...props }) => {
    return React.createElement('MapView', props, children);
  };
  MapView.Marker = ({ children, ...props }) => {
    return React.createElement('MapMarker', props, children);
  };
  return {
    __esModule: true,
    default: MapView,
    Marker: MapView.Marker,
  };
});
