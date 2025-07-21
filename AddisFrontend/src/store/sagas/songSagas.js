import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchSongsRequest,
  fetchSongByIdRequest,
  addSongToAlbumRequest,
  updateSongRequest,
  deleteSongRequest,
  fetchSongsSuccess,
  fetchSongByIdSuccess,
  addSongToAlbumSuccess,
  updateSongSuccess,
  deleteSongSuccess,
  songOperationFailure,
} from '../slices/songSlice';
import apiClient from '../../api/client';

function* fetchSongsSaga(action) {
  try {
    const { page = 1, limit = 10, query = '', filter = 'song' } = action.payload;
    const response = yield call(apiClient.get, '/search', {
      params: { page, limit, query, filter },
    });
    yield put(fetchSongsSuccess({
      data: response.data.data.songs || [],
      pagination: response.data.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: limit,
      },
    }));
  } catch (error) {
    yield put(songOperationFailure(error.message));
  }
}

function* fetchSongByIdSaga(action) {
  try {
    const response = yield call(apiClient.get, `/songs/${action.payload}`);
    yield put(fetchSongByIdSuccess(response.data));
  } catch (error) {
    yield put(songOperationFailure(error.message));
  }
}

function* addSongToAlbumSaga(action) {
  try {
    const { albumId, ...songData } = action.payload;
    const formData = new FormData();
    formData.append('title', songData.title);
    formData.append('duration', songData.duration);
    formData.append('audio', songData.audioFile); 
    
    const response = yield call(apiClient.post, `/${albumId}/songs`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    yield put(addSongToAlbumSuccess(response.data));
  } catch (error) {
    yield put(songOperationFailure(error.message));
  }
}

function* updateSongSaga(action) {
  try {
    const { id, ...updateData } = action.payload;
    const response = yield call(apiClient.put, `/songs/${id}`, updateData);
    yield put(updateSongSuccess(response.data));
  } catch (error) {
    yield put(songOperationFailure(error.message));
  }
}

function* deleteSongSaga(action) {
  try {
    yield call(apiClient.delete, `/songs/${action.payload}`);
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield put(songOperationFailure(error.message));
  }
}

export function* watchSongSagas() {
  yield takeLatest(fetchSongsRequest.type, fetchSongsSaga);
  yield takeLatest(fetchSongByIdRequest.type, fetchSongByIdSaga);
  yield takeLatest(addSongToAlbumRequest.type, addSongToAlbumSaga);
  yield takeLatest(updateSongRequest.type, updateSongSaga);
  yield takeLatest(deleteSongRequest.type, deleteSongSaga);
}