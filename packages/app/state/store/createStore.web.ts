import { configureStore, Reducer } from '@reduxjs/toolkit';

export const createStore = (reducer: Reducer) =>
  configureStore({
    reducer,
    devTools: true,
    enhancers: getDefaultEnhancers => getDefaultEnhancers(),
    // FIXME:
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false, serializableCheck: false }),
  });
