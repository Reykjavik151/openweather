import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { combineReducers } from 'redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import { appSlice, weatherSlice } from '#state/slices';

import { createStore } from './createStore';

export const rootReducer = combineReducers({
  app: appSlice.reducer,
  weather: weatherSlice.reducer,
});

const createNoopStorage = () => ({
  getItem(key: string) {
    return Promise.resolve(null);
  },
  setItem(key: string, value: unknown) {
    return Promise.resolve(value);
  },
  removeItem(key: string) {
    return Promise.resolve();
  },
});
const createStorage = () => {
  switch (Platform.OS) {
    case 'web':
      if (typeof window === 'undefined') {
        return createNoopStorage();
      }
      return createWebStorage('local');
    default:
      return AsyncStorage;
  }
};

const PERSIST_CONFIG: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage: createStorage(),
  blacklist: [],
};

const persistedReducer = persistReducer(PERSIST_CONFIG, rootReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);

// Unсomment this line and re-launch the app to clear persisted cache
persistor.purge();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
