import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import breedsSlice from './breeds';
import commonSlice from './common';
import { rootSaga } from 'store/saga';

export const sagaMiddleware = createSagaMiddleware({
  onError(err) {
    console.log('Error: ', err.message);
  },
});

export const rootReducer = combineReducers({
  breeds: breedsSlice,
  common: commonSlice,
});

export const store = configureStore({
  reducer: persistReducer({ key: 'root', storage: AsyncStorage }, rootReducer),
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);
