import { ActionCreatorWithPayload, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

import { Nullable } from '#types/nullable';

import { ErrorType, LoadingType } from '../types';

export interface IAppState {
  loading: Record<LoadingType, boolean>;
  errors: Record<ErrorType, Nullable<string>>;
}

const INITIAL_STATE: IAppState = {
  loading: {
    isGetUser: false,
    isLoginUser: false,
    isRegisterUser: false,
  },
  errors: {
    getUser: null,
    loginUser: null,
    registerUser: null,
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setError(state, { payload: { error, errorType } }: PayloadAction<{ errorType: ErrorType; error: string }>) {
      state.errors[errorType] = error;
    },
    resetErrors(state) {
      state.errors = _.cloneDeep(INITIAL_STATE.errors);
    },
  },
  extraReducers: builder => {
    const addCases = (
      [actionRequest, actionSuccess, actionError]: [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ActionCreatorWithPayload<any>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ActionCreatorWithPayload<any>,
        ActionCreatorWithPayload<string, string>,
      ],
      loadingType: LoadingType,
      errorType: ErrorType,
    ) => {
      builder.addCase(actionRequest, state => {
        state.loading[loadingType] = true;
        state.errors[errorType] = null;
      });
      builder.addCase(actionSuccess, state => {
        state.loading[loadingType] = false;
      });
      builder.addCase(actionError, (state, action) => {
        state.loading[loadingType] = false;
        state.errors[errorType] = action.payload;
      });
    };
  },
});
