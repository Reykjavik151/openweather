# Weather Forecast App

A comprehensive React Native weather application built with Expo, TypeScript, and Redux Toolkit.

## Demo

![Weather App Demo](assets/demo/demo.gif)

## Features

### Core Features

- **Location Search**: City/location input with autocomplete suggestions
- **Current Weather Display**: Temperature, conditions, humidity, wind speed, feels like temperature
- **5-Day Forecast**: Daily forecast cards with min/max temperatures and weather conditions
- **Geolocation Support**: Automatic location detection with manual override
- **Recent Searches**: Save and access recent location searches

### Technical Features

- **State Management**: Redux Toolkit with Redux Persist
- **API Integration**: OpenWeatherMap API integration
- **Responsive Design**: NativeWind styling with responsive layouts
- **Error Handling**: Comprehensive error handling and loading states
- **TypeScript**: Full TypeScript support with proper typing
- **Performance**: Optimized with React Native best practices

## Setup Instructions

### 1. Install Dependencies

```bash
yarn install
```

### 2. OpenWeatherMap API Key

I've used public OpenWeatherMap API Key from the official source for testing purposes.
So I've hardcoded it.

### 3. Run the Application

```bash
# Start the development server
yarn start

# Run on iOS
yarn ios

# Run on Android
yarn android

# Run on Web
yarn web
```

## Project Structure

```
packages/app/
├── features/
│   └── weather/
│       ├── components/
│       │   ├── LocationSearch.tsx
│       │   ├── CurrentWeather.tsx
│       │   └── FiveDayForecast.tsx
│       └── screen.tsx
├── services/
│   ├── weather/
│   │   └── index.ts
│   └── location/
│       └── index.ts
├── state/
│   └── slices/
│       └── weatherSlice.ts
└── types/
    └── weather.ts
```

## API Integration

The app integrates with OpenWeatherMap API for:

- Current weather data
- 5-day weather forecast
- Location search and geocoding
- Weather icons and conditions

## State Management

Uses Redux Toolkit for state management with:

- Async thunks for API calls
- Persistent storage for recent searches
- Error handling and loading states
- Type-safe actions and reducers

## UI/UX Features

- **Modern Design**: Clean, intuitive interface with gradient backgrounds
- **Responsive Layout**: Adapts to different screen sizes
- **Loading States**: Smooth loading indicators and refresh controls
- **Error Handling**: User-friendly error messages and retry options
- **Accessibility**: Proper accessibility labels and navigation

## Performance Optimizations

- **Lazy Loading**: Components loaded as needed
- **Memoization**: Optimized re-renders with React.memo
- **Efficient API Calls**: Debounced search and cached responses
- **Image Optimization**: Optimized weather icons and assets

## Testing

The app includes comprehensive testing setup:

- Unit tests for components
- Weather service testing
