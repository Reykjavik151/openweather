import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { weatherService } from '#services/weather';
import { CurrentWeather, FiveDayForecast, LocationSearchResult, WeatherState } from '#types/weather';

const initialState: WeatherState = {
  currentWeather: null,
  fiveDayForecast: null,
  isLoading: false,
  isError: false,
  errorMessage: '',
  selectedLocation: null,
  recentSearches: [],
  searchResults: [],
  isSearching: false,
};

// Async thunks
export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrentWeather',
  async ({ lat, lon }: { lat: number; lon: number }) => {
    const response = await weatherService.getCurrentWeather(lat, lon);
    if (!response.success) {
      throw new Error(response.error);
    }
    return response.data as CurrentWeather;
  },
);

export const fetchFiveDayForecast = createAsyncThunk(
  'weather/fetchFiveDayForecast',
  async ({ lat, lon }: { lat: number; lon: number }) => {
    const response = await weatherService.getFiveDayForecast(lat, lon);
    if (!response.success) {
      throw new Error(response.error);
    }
    return response.data as FiveDayForecast;
  },
);

export const searchLocations = createAsyncThunk('weather/searchLocations', async (query: string) => {
  const response = await weatherService.searchLocations(query);
  if (!response.success) {
    throw new Error(response.error);
  }
  return response.data as LocationSearchResult[];
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setSelectedLocation: (state, action: PayloadAction<LocationSearchResult | null>) => {
      state.selectedLocation = action.payload;
    },
    addToRecentSearches: (state, action: PayloadAction<LocationSearchResult>) => {
      const newSearch = action.payload;
      const existingIndex = state.recentSearches.findIndex(
        search => search.lat === newSearch.lat && search.lon === newSearch.lon,
      );

      if (existingIndex !== -1) {
        // Remove existing and add to beginning
        state.recentSearches.splice(existingIndex, 1);
      }

      // Add to beginning and limit to 10 items
      state.recentSearches.unshift(newSearch);
      if (state.recentSearches.length > 10) {
        state.recentSearches = state.recentSearches.slice(0, 10);
      }
    },
    clearSearchResults: state => {
      state.searchResults = [];
    },
    clearError: state => {
      state.isError = false;
      state.errorMessage = '';
    },
  },
  extraReducers: builder => {
    // Current Weather
    builder
      .addCase(fetchCurrentWeather.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentWeather = action.payload;
        state.isError = false;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message || 'Failed to fetch current weather';
      });

    // Five Day Forecast
    builder
      .addCase(fetchFiveDayForecast.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchFiveDayForecast.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fiveDayForecast = action.payload;
        state.isError = false;
      })
      .addCase(fetchFiveDayForecast.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message || 'Failed to fetch forecast';
      });

    // Location Search
    builder
      .addCase(searchLocations.pending, state => {
        state.isSearching = true;
      })
      .addCase(searchLocations.fulfilled, (state, action) => {
        state.isSearching = false;
        state.searchResults = action.payload;
      })
      .addCase(searchLocations.rejected, (state, action) => {
        state.isSearching = false;
        state.searchResults = [];
        state.isError = true;
        state.errorMessage = action.error.message || 'Failed to search locations';
      });
  },
});

export const { setSelectedLocation, addToRecentSearches, clearSearchResults, clearError } = weatherSlice.actions;

export const weatherReducer = weatherSlice.reducer;

export { weatherSlice };
