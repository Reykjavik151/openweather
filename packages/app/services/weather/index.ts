/* eslint-disable class-methods-use-this */

import { create } from 'apisauce';

import { CurrentWeather, FiveDayForecast, LocationSearchResult, WeatherApiResponse } from '#types/weather';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEOCODING_API_URL = 'https://api.openweathermap.org/geo/1.0';
// TODO: Move to environment variable in production (.env file)
// This is public but should be in .env for production
const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';

// Create API instances
const weatherApi = create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const geocodingApi = create({
  baseURL: GEOCODING_API_URL,
  timeout: 10000,
});

// Add API key to requests
const addApiKey = (params: Record<string, string | number>) => ({
  ...params,
  appid: API_KEY,
});

export interface WeatherService {
  getCurrentWeather: (lat: number, lon: number) => Promise<WeatherApiResponse>;
  getFiveDayForecast: (lat: number, lon: number) => Promise<WeatherApiResponse>;
  searchLocations: (query: string) => Promise<WeatherApiResponse>;
}

class OpenWeatherService implements WeatherService {
  async getCurrentWeather(lat: number, lon: number): Promise<WeatherApiResponse> {
    try {
      const response = await weatherApi.get(
        '/weather',
        addApiKey({
          lat,
          lon,
          units: 'metric',
        }),
      );

      if (response.ok && response.data) {
        return {
          success: true,
          data: response.data as CurrentWeather,
        };
      }

      return {
        success: false,
        error:
          response.problem === 'CLIENT_ERROR'
            ? 'API key is invalid or missing. Please check your OpenWeatherMap API key configuration.'
            : response.problem || 'Failed to fetch current weather',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async getFiveDayForecast(lat: number, lon: number): Promise<WeatherApiResponse> {
    try {
      const response = await weatherApi.get(
        '/forecast',
        addApiKey({
          lat,
          lon,
          units: 'metric',
        }),
      );

      if (response.ok && response.data) {
        return {
          success: true,
          data: response.data as FiveDayForecast,
        };
      }

      return {
        success: false,
        error:
          response.problem === 'CLIENT_ERROR'
            ? 'API key is invalid or missing. Please check your OpenWeatherMap API key configuration.'
            : response.problem || 'Failed to fetch forecast',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async searchLocations(query: string): Promise<WeatherApiResponse> {
    try {
      const response = await geocodingApi.get(
        '/direct',
        addApiKey({
          q: query,
          limit: 5,
        }),
      );

      if (response.ok && response.data) {
        return {
          success: true,
          data: response.data as LocationSearchResult[],
        };
      }

      return {
        success: false,
        error:
          response.problem === 'CLIENT_ERROR'
            ? 'API key is invalid or missing. Please check your OpenWeatherMap API key configuration.'
            : response.problem || 'Failed to search locations',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}

export const weatherService = new OpenWeatherService();
