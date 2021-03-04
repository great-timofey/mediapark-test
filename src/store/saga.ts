import { all } from 'redux-saga/effects';
import { breedSaga } from '$store/breeds/saga';

export function* rootSaga() {
  yield all([breedSaga()]);
}
