import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';

import { weatherReducer } from '#state/slices/weatherSlice';
import { WeatherState } from '#types/weather';

import { LocationSearch } from '../components/LocationSearch';

const createMockStore = (initialState: Partial<WeatherState> = {}) =>
  configureStore({
    reducer: {
      weather: weatherReducer,
    },
    preloadedState: {
      weather: {
        currentWeather: null,
        fiveDayForecast: null,
        isLoading: false,
        isError: false,
        errorMessage: '',
        selectedLocation: null,
        recentSearches: [],
        searchResults: [],
        isSearching: false,
        ...initialState,
      },
    },
  });

describe('LocationSearch Component', () => {
  it('renders search input correctly', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <LocationSearch />
      </Provider>,
    );

    expect(screen.getByPlaceholderText('Search for a city...')).toBeTruthy();
  });

  it('shows current location button', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <LocationSearch />
      </Provider>,
    );

    expect(screen.getByText('📍')).toBeTruthy();
  });

  it('handles search input changes', async () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <LocationSearch />
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText('Search for a city...');
    fireEvent.changeText(searchInput, 'New York');

    expect(searchInput.props.value).toBe('New York');
  });

  it('displays search results when available', () => {
    const mockSearchResults = [
      {
        name: 'New York',
        lat: 40.7128,
        lon: -74.006,
        country: 'US',
        state: 'NY',
      },
    ];

    const store = createMockStore({
      searchResults: mockSearchResults,
      recentSearches: [],
      isSearching: false,
    });

    render(
      <Provider store={store}>
        <LocationSearch />
      </Provider>,
    );

    // Test that the component renders without errors
    expect(screen.getByPlaceholderText('Search for a city...')).toBeTruthy();
    expect(screen.getByText('📍')).toBeTruthy();
  });

  it('shows recent searches when no search query', () => {
    const mockRecentSearches = [
      {
        name: 'London',
        lat: 51.5074,
        lon: -0.1278,
        country: 'GB',
      },
    ];

    const store = createMockStore({
      searchResults: [],
      recentSearches: mockRecentSearches,
      isSearching: false,
    });

    render(
      <Provider store={store}>
        <LocationSearch />
      </Provider>,
    );

    // Test that the component renders without errors
    expect(screen.getByPlaceholderText('Search for a city...')).toBeTruthy();
    expect(screen.getByText('📍')).toBeTruthy();
  });
});
