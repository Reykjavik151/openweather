import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, Text, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '#hooks';
import { SafeAreaView } from '#provider/safeArea/safeAreaView';
import { clearError, fetchCurrentWeather, fetchFiveDayForecast, setSelectedLocation } from '#state/slices/weatherSlice';
import { LocationSearchResult } from '#types/weather';

import { CurrentWeather } from './components/CurrentWeather';
import { FiveDayForecast } from './components/FiveDayForecast';
import { LocationSearch } from './components/LocationSearch';

export function WeatherScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { currentWeather, fiveDayForecast, isLoading, isError, errorMessage } = useAppSelector(state => state.weather);

  const handleLocationSelect = useCallback(
    (location: LocationSearchResult) => {
      dispatch(setSelectedLocation(location));
      dispatch(fetchCurrentWeather({ lat: location.lat, lon: location.lon }));
      dispatch(fetchFiveDayForecast({ lat: location.lat, lon: location.lon }));
    },
    [dispatch],
  );

  const handleErrorDismiss = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isError && errorMessage) {
      Alert.alert(t('weather.error.title'), errorMessage, [
        { text: t('weather.error.ok'), onPress: handleErrorDismiss },
      ]);
    }
  }, [isError, errorMessage, dispatch, t, handleErrorDismiss]);

  return (
    <ScrollView
      className="flex-1 bg-sky-400"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView className="p-4">
        <Text className="mb-6 text-3xl font-bold text-white">{t('weather.title')}</Text>

        <LocationSearch onLocationSelect={handleLocationSelect} />

        {currentWeather && <CurrentWeather weather={currentWeather} />}

        {fiveDayForecast && <FiveDayForecast forecast={fiveDayForecast} />}

        {!currentWeather && !isLoading && (
          <View className="items-center justify-center py-20">
            <Text className="text-center text-xl text-white">{t('weather.empty.message')}</Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
