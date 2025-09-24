import { configureStore, Reducer } from '@reduxjs/toolkit';

export const createStore = (reducer: Reducer) =>
  configureStore({
    reducer,
    devTools: true,
    enhancers: getDefaultEnhancers => getDefaultEnhancers(),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: false,
      }),
  });
