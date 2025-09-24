import { configureStore, Reducer } from '@reduxjs/toolkit';
import reduxDevtoolsEnhancer from 'redux-devtools-expo-dev-plugin';

export const createStore = (reducer: Reducer) =>
  configureStore({
    reducer,
    devTools: false,
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(reduxDevtoolsEnhancer()),
    // FIXME:
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false, serializableCheck: false }),
  });
