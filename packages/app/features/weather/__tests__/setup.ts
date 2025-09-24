// Test setup file
import 'react-native-gesture-handler/jestSetup';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18next for testing
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  resources: {
    en: {
      translation: {
        weather: {
          title: 'Weather',
          search: {
            placeholder: 'Search for a city...',
            searching: 'Searching...',
            noResults: 'No locations found',
            recentSearches: 'Recent Searches',
            currentLocation: '📍',
          },
          current: {
            feelsLike: 'Feels like',
            humidity: 'Humidity',
            windSpeed: 'Wind Speed',
            pressure: 'Pressure',
            visibility: 'Visibility',
          },
          forecast: {
            title: '5-Day Forecast',
            hourly: 'Hourly',
            today: 'Today',
            tomorrow: 'Tomorrow',
          },
          empty: {
            message: 'Search for a location to see weather information',
          },
          error: {
            title: 'Error',
            ok: 'OK',
          },
        },
      },
    },
  },
});

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock expo-location
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: {
        latitude: 40.7128,
        longitude: -74.006,
      },
    }),
  ),
  reverseGeocodeAsync: jest.fn(() =>
    Promise.resolve([
      {
        city: 'New York',
        country: 'US',
        region: 'NY',
      },
    ]),
  ),
}));

// Mock apisauce (removed to avoid conflicts with individual test mocks)
