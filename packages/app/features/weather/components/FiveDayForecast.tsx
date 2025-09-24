import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, View } from 'react-native';

import { FiveDayForecast as FiveDayForecastType, ForecastDay, WeatherCondition } from '#types/weather';

interface DailyForecastData {
  date: string;
  dayForecast: ForecastDay;
  maxTemp: number;
  minTemp: number;
  dominantWeather: WeatherCondition;
  hourlyForecasts: ForecastDay[];
}

interface FiveDayForecastProps {
  forecast: FiveDayForecastType;
}

export function FiveDayForecast({ forecast }: FiveDayForecastProps) {
  const { t } = useTranslation();
  const getWeatherIcon = useCallback((iconCode: string) => `https://openweathermap.org/img/wn/${iconCode}@2x.png`, []);

  const formatTemperature = useCallback((temp: number) => `${Math.round(temp)}°`, []);

  const formatDate = useCallback((timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }, []);

  const formatTime = useCallback((timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  const groupForecastByDay = useCallback((acc: Record<string, ForecastDay[]>, item: ForecastDay) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date]!.push(item);
    return acc;
  }, []);

  const processDailyForecast = useCallback(([date, items]: [string, ForecastDay[]]) => {
    const dayForecast = items[0]; // Use first item of the day
    if (!dayForecast) return null;
    const maxTemp = Math.max(...items.map(item => item.main.temp_max));
    const minTemp = Math.min(...items.map(item => item.main.temp_min));
    const mostCommonWeather = items.reduce(
      (acc, item) => {
        const weather = item.weather[0];
        if (weather && !acc[weather.main]) {
          acc[weather.main] = { count: 0, weather };
        }
        if (weather && acc[weather.main]) {
          acc[weather.main]!.count += 1;
        }
        return acc;
      },
      {} as Record<string, { count: number; weather: WeatherCondition }>,
    );

    const dominantWeather = Object.values(mostCommonWeather).reduce((prev, current) =>
      current.count > prev.count ? current : prev,
    );

    return {
      date,
      dayForecast,
      maxTemp,
      minTemp,
      dominantWeather: dominantWeather.weather,
      hourlyForecasts: items,
    };
  }, []);

  // Group forecast by day
  const groupedForecast = forecast.list.reduce(groupForecastByDay, {} as Record<string, ForecastDay[]>);

  const dailyForecasts = Object.entries(groupedForecast)
    .map(processDailyForecast)
    .filter((item): item is DailyForecastData => item !== null);

  const renderDailyCard = useCallback(
    (dailyData: DailyForecastData) => (
      <View
        className="border-sky mb-3 rounded-xl bg-sky-500 py-4"
        key={dailyData.date}
      >
        <View className="mb-3 flex-row items-center justify-between px-4">
          <View>
            <Text className="text-lg font-semibold text-white">{formatDate(dailyData.dayForecast.dt)}</Text>
            <Text className="text-sm capitalize text-white">{dailyData.dominantWeather.description}</Text>
          </View>

          <View className="flex-row items-center">
            <Image
              alt={`${dailyData.dominantWeather.description} icon`}
              className="mr-3 h-12 w-12"
              resizeMode="contain"
              source={{ uri: getWeatherIcon(dailyData.dominantWeather.icon) }}
            />
            <View className="items-end">
              <Text className="text-2xl font-bold text-white">{formatTemperature(dailyData.maxTemp)}</Text>
              <Text className="text-lg text-white">{formatTemperature(dailyData.minTemp)}</Text>
            </View>
          </View>
        </View>

        {/* Hourly forecast for the day */}
        <ScrollView
          horizontal
          contentContainerStyle={{ paddingHorizontal: 16 }}
          showsHorizontalScrollIndicator={false}
        >
          <View className="flex-row">
            {dailyData.hourlyForecasts.slice(0, 8).map((hourly: ForecastDay) => (
              <View
                className="mr-4 items-center"
                key={`${hourly.dt}-${hourly.main.temp}`}
              >
                <Text className="mb-1 text-sm text-white">{formatTime(hourly.dt)}</Text>
                <Image
                  alt={`${hourly.weather[0]?.description || 'weather'} icon`}
                  className="mb-1 h-8 w-8"
                  resizeMode="contain"
                  source={{ uri: getWeatherIcon(hourly.weather[0]?.icon || '01d') }}
                />
                <Text className="text-sm font-medium text-white">{formatTemperature(hourly.main.temp)}</Text>
                <Text className="text-xs text-white">{Math.round(hourly.pop * 100)}%</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    ),
    [formatDate, formatTemperature, formatTime, getWeatherIcon],
  );

  return (
    <View>
      <Text className="mb-4 text-xl font-bold text-white">{t('weather.forecast.title')}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>{dailyForecasts.map(renderDailyCard)}</ScrollView>
    </View>
  );
}
