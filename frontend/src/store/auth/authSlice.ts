import { createSlice } from '@reduxjs/toolkit'
import { User } from 'src/types';

import Cookies from 'js-cookie';
import { authApi } from '../api/authApi';

const initialState: {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
} = {
  user: null,
  loading: true,
  token: Cookies.get('accessToken') ?? null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: () => ({ ...initialState, token: null, loading: false })
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.loading = false;
        state.isAuthenticated = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.loading = false;
        state.isAuthenticated = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.editUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.loading = false;
        state.isAuthenticated = true;
      }
    );

    builder.addMatcher(
      authApi.endpoints.auth.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.loading = false;
        state.isAuthenticated = true;
      },
    );
    builder.addMatcher(
      authApi.endpoints.auth.matchRejected,
      (state, { payload }) => {
        state.user = null;
        state.loading = false;
        state.isAuthenticated = false;
      },
    );
    builder.addMatcher(
      authApi.endpoints.auth.matchPending,
      (state, { payload }) => {
        state.user = null;
        state.loading = true;
        state.isAuthenticated = false;
      },
    );
  }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
