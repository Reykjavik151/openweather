import { configureStore, Reducer } from '@reduxjs/toolkit';
import reduxDevtoolsEnhancer from 'redux-devtools-expo-dev-plugin';

export const createStore = (reducer: Reducer) =>
  configureStore({
    reducer,
    devTools: false,
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(reduxDevtoolsEnhancer()),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: false,
      }),
  });
