import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '#hooks';
import { locationService } from '#services/location';
import {
  addToRecentSearches,
  clearSearchResults,
  searchLocations,
  setSelectedLocation,
} from '#state/slices/weatherSlice';
import { LocationSearchResult } from '#types/weather';

interface LocationSearchProps {
  onLocationSelect?: (location: LocationSearchResult) => void;
}

export function LocationSearch({ onLocationSelect }: LocationSearchProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textInputRef = useRef<TextInput>(null);

  const dispatch = useAppDispatch();
  const { searchResults, recentSearches, isSearching } = useAppSelector(state => state.weather);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const timeoutId = setTimeout(() => {
        dispatch(searchLocations(searchQuery));
      }, 300);

      return () => clearTimeout(timeoutId);
    }
    dispatch(clearSearchResults());
    return () => {};
  }, [searchQuery, dispatch]);

  const handleLocationSelect = useCallback(
    (location: LocationSearchResult) => {
      dispatch(setSelectedLocation(location));
      dispatch(addToRecentSearches(location));
      setSearchQuery(location.name);
      setIsFocused(false);
      dispatch(clearSearchResults()); // Clear search results after selection
      textInputRef.current?.blur(); // Blur the input to dismiss keyboard
      onLocationSelect?.(location);
    },
    [dispatch, onLocationSelect],
  );

  const handleCurrentLocation = useCallback(async () => {
    const location = await locationService.getCurrentPosition();
    if (location) {
      handleLocationSelect(location);
    }
  }, [handleLocationSelect]);

  const handleLocationItemPress = useCallback(
    (item: LocationSearchResult) => {
      handleLocationSelect(item);
    },
    [handleLocationSelect],
  );

  const renderLocationItem = useCallback(
    // eslint-disable-next-line react/no-unused-prop-types
    ({ item }: { item: LocationSearchResult }) => (
      <TouchableOpacity
        activeOpacity={0.7}
        className="border-b border-sky-200 p-3"
        onPress={() => handleLocationItemPress(item)}
      >
        <Text className="text-base font-medium text-black">{item.name}</Text>
        {item.state && (
          <Text className="text-sm text-gray-600">
            {item.state}, {item.country}
          </Text>
        )}
      </TouchableOpacity>
    ),
    [handleLocationItemPress],
  );

  const renderRecentItem = useCallback(
    // eslint-disable-next-line react/no-unused-prop-types
    ({ item }: { item: LocationSearchResult }) => (
      <TouchableOpacity
        activeOpacity={0.7}
        className="border-b border-sky-200 p-3"
        onPress={() => handleLocationItemPress(item)}
      >
        <Text className="text-base font-medium text-black">{item.name}</Text>
        {item.state && (
          <Text className="text-sm text-gray-600">
            {item.state}, {item.country}
          </Text>
        )}
      </TouchableOpacity>
    ),
    [handleLocationItemPress],
  );

  const handleInputBlur = useCallback(() => {
    setTimeout(() => setIsFocused(false), 150);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    // Clear search results when focusing to show recent searches
    if (searchQuery.length <= 2) {
      dispatch(clearSearchResults());
    }
  }, [searchQuery.length, dispatch]);

  const renderDropdownContent = useCallback(() => {
    if (isSearching) {
      return (
        <View className="p-3">
          <Text className="text-center text-black">{t('weather.search.searching')}</Text>
        </View>
      );
    }

    if (searchResults.length > 0) {
      return (
        <ScrollView
          showsVerticalScrollIndicator
          className="max-h-60"
          keyboardShouldPersistTaps="handled"
          pointerEvents="box-none"
        >
          {searchResults.map(item => (
            <View key={`${item.lat}-${item.lon}`}>{renderLocationItem({ item })}</View>
          ))}
        </ScrollView>
      );
    }

    // Show recent searches when focused but no search results
    if (recentSearches.length > 0 && searchResults.length === 0) {
      return (
        <ScrollView
          showsVerticalScrollIndicator
          className="max-h-60"
          keyboardShouldPersistTaps="handled"
          pointerEvents="box-none"
        >
          <Text className="bg-sky-200 p-2 text-sm font-medium text-black">{t('weather.search.recentSearches')}</Text>
          {recentSearches.map(item => (
            <View key={`${item.lat}-${item.lon}`}>{renderRecentItem({ item })}</View>
          ))}
        </ScrollView>
      );
    }

    if (searchQuery.length > 2) {
      return (
        <View className="p-3">
          <Text className="text-center text-black">{t('weather.search.noResults')}</Text>
        </View>
      );
    }

    return null;
  }, [isSearching, searchResults, recentSearches, searchQuery, t, renderLocationItem, renderRecentItem]);

  return (
    <View>
      <View className="flex-row items-center rounded-lg border border-sky-300 bg-white px-3 py-2 shadow-sm">
        <TextInput
          ref={textInputRef}
          className="bold flex-1 items-center text-lg text-sky-600"
          placeholder={t('weather.search.placeholder')}
          placeholderTextColor="#7DD3FC"
          style={{ lineHeight: 20, textAlignVertical: 'center' }}
          value={searchQuery}
          onBlur={handleInputBlur}
          onChangeText={setSearchQuery}
          onFocus={handleInputFocus}
        />
        <TouchableOpacity
          className="ml-2 rounded-lg bg-sky-400 p-2"
          onPress={handleCurrentLocation}
        >
          <Text className="text-sm font-medium">{t('weather.search.currentLocation')}</Text>
        </TouchableOpacity>
      </View>

      {isFocused && (
        <View
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 rounded-lg border border-sky-300 bg-white shadow-lg"
          style={{ elevation: 1000 }}
        >
          {renderDropdownContent()}
        </View>
      )}
    </View>
  );
}
