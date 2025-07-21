import { all } from 'redux-saga/effects';
import { watchAlbumSagas } from './albumSagas';
import { watchSongSagas } from './songSagas';

export default function* rootSaga() {
  yield all([
    watchAlbumSagas(),
    watchSongSagas(),
  ]);
}