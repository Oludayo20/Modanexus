import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '../features/auth/authSlice';
import { cloudinaryApi } from '../features/cloudinary/cloudinaryAdapter';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    [cloudinaryApi.reducerPath]: cloudinaryApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      cloudinaryApi.middleware
    ),
  devTools: true
});

setupListeners(store.dispatch);
