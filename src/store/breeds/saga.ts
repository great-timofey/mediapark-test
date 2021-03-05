import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  incrementPage,
  addBreeds,
  requestBreeds,
  requestNewBreedImage,
  updateBreedImage,
} from '.';
import { RootState } from '$store';
import { setError, setLoading } from '$store/common';
import { BreedImageType, BreedType } from '$types/breeds';
import { fetchBreeds, getRandomBreedImage } from '$services/api';

function* fetchBreedsSaga() {
  const { page } = yield select((state: RootState) => state.breeds);

  yield put(setLoading(true));

  try {
    const breedsResponse: { data: BreedType[] } = yield call(fetchBreeds, page);
    const { data } = breedsResponse;

    const cleanData = data.filter((breed) => !!breed.image);

    yield put(incrementPage());
    yield put(addBreeds(cleanData));
  } catch (err) {
    console.log(err);
    yield put(setError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* fetchBreedImageSaga(action: PayloadAction<string>) {
  const { payload } = action;

  try {
    yield put(setLoading(true));

    const newImage: BreedImageType = yield call(getRandomBreedImage, payload);

    const { width, height, url, id: newId } = newImage;

    yield put(
      updateBreedImage({
        idToUpdate: payload,
        newImage: { url, height, width, id: newId },
      }),
    );
  } catch (err) {
    console.log(err);
    yield put(setError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

export function* breedSaga() {
  yield takeLatest(requestBreeds, fetchBreedsSaga);
  yield takeEvery(requestNewBreedImage, fetchBreedImageSaga);
}
