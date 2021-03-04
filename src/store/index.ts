import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import breedsSlice from './breeds';
import commonSlice from './common';
import { rootSaga } from 'store/saga';

export const sagaMiddleware = createSagaMiddleware({
  onError(err) {
    console.log('Error: ', err.message);
  },
});

export const store = configureStore({
  reducer: {
    breeds: breedsSlice,
    common: commonSlice,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);
