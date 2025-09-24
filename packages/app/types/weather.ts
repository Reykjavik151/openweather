import { Nullable } from '#types/nullable';

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WindData {
  speed: number;
  deg: number;
  gust?: number;
}

export interface CloudsData {
  all: number;
}

export interface SysData {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface CoordData {
  lon: number;
  lat: number;
}

export interface CurrentWeather {
  coord: CoordData;
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: WindData;
  clouds: CloudsData;
  dt: number;
  sys: SysData;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastDay {
  dt: number;
  main: MainWeatherData;
  weather: WeatherCondition[];
  clouds: CloudsData;
  wind: WindData;
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface FiveDayForecast {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastDay[];
  city: {
    id: number;
    name: string;
    coord: CoordData;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface LocationSearchResult {
  name: string;
  local_names?: {
    [key: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface WeatherState {
  currentWeather: Nullable<CurrentWeather>;
  fiveDayForecast: Nullable<FiveDayForecast>;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  selectedLocation: Nullable<LocationSearchResult>;
  recentSearches: LocationSearchResult[];
  searchResults: LocationSearchResult[];
  isSearching: boolean;
}

export interface WeatherApiResponse {
  success: boolean;
  data?: CurrentWeather | FiveDayForecast | LocationSearchResult[];
  error?: string;
}
