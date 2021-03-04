import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '$store';

import { incrementPage, addBreeds, requestBreeds } from '.';
import { fetchBreeds } from '$services/api';
import { setError, setLoading } from '$store/common';

function* fetchBreedsSaga() {
  const { page } = yield select((state: RootState) => state.breeds);

  yield put(setLoading(true));

  try {
    const breedsResponse = yield call(fetchBreeds, page + 1);
    const { data } = breedsResponse;

    yield put(incrementPage());
    yield put(addBreeds(data));
  } catch (err) {
    console.log(err);
    yield put(setError(err));
  } finally {
    yield put(setLoading(false));
  }
}

export function* breedSaga() {
  yield takeEvery(requestBreeds, fetchBreedsSaga);
}
