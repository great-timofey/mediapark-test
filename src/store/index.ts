import { configureStore } from '@reduxjs/toolkit';
import breedsSlice from './breeds';

export const store = configureStore({
  reducer: {
    breeds: breedsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
