import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { CurrentWeather as CurrentWeatherType } from '#types/weather';

import { CurrentWeather } from '../components/CurrentWeather';

const mockWeather: CurrentWeatherType = {
  coord: { lon: -74.006, lat: 40.7128 },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
  base: 'stations',
  main: {
    temp: 22.5,
    feels_like: 24.1,
    temp_min: 20.0,
    temp_max: 25.0,
    pressure: 1013,
    humidity: 65,
  },
  visibility: 10000,
  wind: {
    speed: 3.5,
    deg: 180,
  },
  clouds: {
    all: 0,
  },
  dt: 1640995200,
  sys: {
    type: 1,
    id: 1234,
    country: 'US',
    sunrise: 1640952000,
    sunset: 1640991600,
  },
  timezone: -18000,
  id: 5128581,
  name: 'New York',
  cod: 200,
};

describe('CurrentWeather Component', () => {
  it('renders weather information correctly', () => {
    render(<CurrentWeather weather={mockWeather} />);

    expect(screen.getByText('New York, US')).toBeTruthy();
    expect(screen.getByText('23°C')).toBeTruthy();
    expect(screen.getByText('clear sky')).toBeTruthy();
    expect(screen.getByText('Feels like 24°C')).toBeTruthy();
  });

  it('displays temperature correctly', () => {
    render(<CurrentWeather weather={mockWeather} />);

    expect(screen.getByText('25°C')).toBeTruthy(); // High temp
    expect(screen.getByText('20°C')).toBeTruthy(); // Low temp
  });

  it('shows weather details', () => {
    render(<CurrentWeather weather={mockWeather} />);

    expect(screen.getByText('65%')).toBeTruthy(); // Humidity
    expect(screen.getByText('13 km/h')).toBeTruthy(); // Wind speed
    expect(screen.getByText('1013 hPa')).toBeTruthy(); // Pressure
  });

  it('displays sunrise and sunset times', () => {
    render(<CurrentWeather weather={mockWeather} />);

    expect(screen.getByText('Sunrise')).toBeTruthy();
    expect(screen.getByText('Sunset')).toBeTruthy();
  });
});
