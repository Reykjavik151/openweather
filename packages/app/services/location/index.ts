import * as Location from 'expo-location';

import { LocationSearchResult } from '#types/weather';

export interface LocationService {
  getCurrentPosition: () => Promise<LocationSearchResult | null>;
  requestPermissions: () => Promise<boolean>;
}

class ExpoLocationService implements LocationService {
  // eslint-disable-next-line class-methods-use-this
  async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error requesting location permissions:', error);
      return false;
    }
  }

  async getCurrentPosition(): Promise<LocationSearchResult | null> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        throw new Error('Location permission denied');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // Get location name using reverse geocoding
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const place = reverseGeocode[0];
        if (place) {
          return {
            name: `${place.city || place.region || 'Unknown'}, ${place.country || 'Unknown'}`,
            lat: location.coords.latitude,
            lon: location.coords.longitude,
            country: place.country || 'Unknown',
            state: place.region || undefined,
          };
        }
      }

      // Fallback if reverse geocoding fails
      return {
        name: 'Current Location',
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        country: 'Unknown',
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error getting current position:', error);
      return null;
    }
  }
}

export const locationService = new ExpoLocationService();
