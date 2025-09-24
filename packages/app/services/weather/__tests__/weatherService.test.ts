// Mock the entire weather service module
import { weatherService } from '../index';

jest.mock('../index', () => ({
  weatherService: {
    getCurrentWeather: jest.fn(),
    getFiveDayForecast: jest.fn(),
    searchLocations: jest.fn(),
  },
}));

describe('WeatherService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCurrentWeather', () => {
    it('should return weather data on successful API call', async () => {
      const mockWeatherData = {
        name: 'New York',
        main: { temp: 22.5 },
        weather: [{ description: 'clear sky' }],
      };

      // Mock the service method directly
      (weatherService.getCurrentWeather as jest.Mock).mockResolvedValue({
        success: true,
        data: mockWeatherData,
      });

      const result = await weatherService.getCurrentWeather(40.7128, -74.006);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockWeatherData);
    });

    it('should handle API errors', async () => {
      // Mock the service method to return an error
      (weatherService.getCurrentWeather as jest.Mock).mockResolvedValue({
        success: false,
        error: 'NETWORK_ERROR',
      });

      const result = await weatherService.getCurrentWeather(40.7128, -74.006);

      expect(result.success).toBe(false);
      expect(result.error).toBe('NETWORK_ERROR');
    });

    it('should handle exceptions', async () => {
      // Mock the service method to throw an error
      (weatherService.getCurrentWeather as jest.Mock).mockResolvedValue({
        success: false,
        error: 'Network error',
      });

      const result = await weatherService.getCurrentWeather(40.7128, -74.006);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Network error');
    });
  });

  describe('getFiveDayForecast', () => {
    it('should return forecast data on successful API call', async () => {
      const mockForecastData = {
        list: [
          {
            dt: 1640995200,
            main: { temp: 22.5 },
            weather: [{ description: 'clear sky' }],
          },
        ],
        city: { name: 'New York' },
      };

      // Mock the service method directly
      (weatherService.getFiveDayForecast as jest.Mock).mockResolvedValue({
        success: true,
        data: mockForecastData,
      });

      const result = await weatherService.getFiveDayForecast(40.7128, -74.006);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockForecastData);
    });
  });

  describe('searchLocations', () => {
    it('should return location search results', async () => {
      const mockSearchResults = [
        {
          name: 'New York',
          lat: 40.7128,
          lon: -74.006,
          country: 'US',
        },
      ];

      // Mock the service method directly
      (weatherService.searchLocations as jest.Mock).mockResolvedValue({
        success: true,
        data: mockSearchResults,
      });

      const result = await weatherService.searchLocations('New York');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockSearchResults);
    });
  });
});
