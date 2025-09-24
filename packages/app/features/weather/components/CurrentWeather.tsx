import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';

import { CurrentWeather as CurrentWeatherType } from '#types/weather';

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
}

export function CurrentWeather({ weather }: CurrentWeatherProps) {
  const { t } = useTranslation();
  const getWeatherIcon = (iconCode: string) => `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const formatTemperature = useCallback((temp: number) => `${Math.round(temp)}°C`, []);

  const formatWindSpeed = useCallback((speed: number) => `${Math.round(speed * 3.6)} km/h`, []); // Convert m/s to km/h
  const formatHumidity = useCallback((humidity: number) => `${humidity}%`, []);

  const formatPressure = useCallback((pressure: number) => `${pressure} hPa`, []);

  return (
    <View className="my-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 px-2 py-4 shadow-lg">
      {/* Location and Date */}
      <View className="mb-4">
        <Text className="text-center font-bold">
          <Text className="text-3xl text-white">{weather.name}, </Text>
          <Text className="text-3xl text-white">{weather.sys.country}</Text>
        </Text>
        <Text className="text-center text-sm text-white">
          {new Date(weather.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      {/* Main Weather Info */}
      <View className="mb-6 flex-row items-center justify-between">
        <View className="flex-1 px-4">
          <Text className="text-6xl font-bold text-white">{formatTemperature(weather.main.temp)}</Text>
          <Text className="text-lg capitalize text-white">{weather.weather[0]?.description}</Text>
          <Text className="text-lg text-white">
            {t('weather.current.feelsLike')} {formatTemperature(weather.main.feels_like)}
          </Text>
        </View>

        <View className="items-center">
          <Image
            alt={`${weather.weather[0]?.description || 'weather'} icon`}
            className="h-24 w-24"
            resizeMode="contain"
            source={{ uri: getWeatherIcon(weather.weather[0]?.icon || '01d') }}
          />
        </View>
      </View>

      {/* Weather Details Grid */}
      <View className="flex-row justify-between">
        <View className="flex-1 items-center">
          <Text className="text-2xl font-bold text-white">{formatTemperature(weather.main.temp_max)}</Text>
          <Text className="text-sm text-white">High</Text>
        </View>

        <View className="flex-1 items-center">
          <Text className="text-2xl font-bold text-white">{formatTemperature(weather.main.temp_min)}</Text>
          <Text className="text-sm text-white">Low</Text>
        </View>

        <View className="flex-1 items-center">
          <Text className="text-2xl font-bold text-white">{formatHumidity(weather.main.humidity)}</Text>
          <Text className="text-sm text-white">{t('weather.current.humidity')}</Text>
        </View>
      </View>

      {/* Additional Details */}
      <View className="mt-4 flex-row justify-between border-t border-white pt-4">
        <View className="flex-1 items-center">
          <Text className="text-lg font-semibold text-white">{formatWindSpeed(weather.wind.speed)}</Text>
          <Text className="text-sm text-white">{t('weather.current.windSpeed')}</Text>
        </View>

        <View className="flex-1 items-center">
          <Text className="text-lg font-semibold text-white">{formatPressure(weather.main.pressure)}</Text>
          <Text className="text-sm text-white">{t('weather.current.pressure')}</Text>
        </View>

        <View className="flex-1 items-center">
          <Text className="text-lg font-semibold text-white">{weather.visibility / 1000} km</Text>
          <Text className="text-sm text-white">{t('weather.current.visibility')}</Text>
        </View>
      </View>

      {/* Sunrise/Sunset */}
      <View className="mt-4 flex-row justify-between border-t border-white pt-4">
        <View className="flex-1 items-center">
          <Text className="text-lg font-semibold text-white">
            {new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <Text className="text-sm text-white">Sunrise</Text>
        </View>

        <View className="flex-1 items-center">
          <Text className="text-lg font-semibold text-white">
            {new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <Text className="text-sm text-white">Sunset</Text>
        </View>
      </View>
    </View>
  );
}
