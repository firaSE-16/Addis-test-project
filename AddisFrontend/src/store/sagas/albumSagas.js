import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchAlbumsSuccess,
  fetchAlbumsRequest,
  fetchAlbumByIdRequest,
  fetchAlbumByIdSuccess,
  createAlbumRequest,
  updateAlbumRequest,
  deleteAlbumRequest,
  createAlbumSuccess,
  updateAlbumSuccess,
  deleteAlbumSuccess,
  albumOperationFailure,
} from '../slices/albumSlice';
import apiClient from '../../api/client';

function* fetchAlbumsSaga(action) {
  try {
    const { page = 1, limit = 10, query = '', filter = 'album' } = action.payload;
    const response = yield call(apiClient.get, '/search', {
      params: { page, limit, query, filter },
    });
    const backendData = response.data && response.data.data ? response.data.data : {};
    yield put(fetchAlbumsSuccess({
      data: Array.isArray(backendData.albums) ? backendData.albums : [],
      pagination: response.data.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: limit,
      },
    }));
  } catch (error) {
    yield put(albumOperationFailure(error.message));
  }
}

function* fetchAlbumByIdSaga(action) {
  try {
    const response = yield call(apiClient.get, `/album/${action.payload}`);
    yield put(fetchAlbumByIdSuccess(response.data));
  } catch (error) {
    yield put(albumOperationFailure(error.message));
  }
}

function* createAlbumSaga(action) {
  try {
    const formData = new FormData();
    Object.keys(action.payload).forEach(key => {
      if (key === 'coverImage' && action.payload[key]) {
        formData.append('cover', action.payload[key]); 
      } else if (action.payload[key]) {
        formData.append(key, action.payload[key]);
      }
    });
    
    const response = yield call(apiClient.post, '/album', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    yield put(createAlbumSuccess(response.data));
  } catch (error) {
    yield put(albumOperationFailure(error.message));
  }
}

function* updateAlbumSaga(action) {
  try {
    const { id, ...updateData } = action.payload;
    const formData = new FormData();
    Object.keys(updateData).forEach(key => {
      if (key === 'coverImage' && updateData[key]) {
        formData.append('coverImage', updateData[key]);
      } else if (updateData[key]) {
        formData.append(key, updateData[key]);
      }
    });
    
    const response = yield call(apiClient.put, `/albums/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    yield put(updateAlbumSuccess(response.data));
  } catch (error) {
    yield put(albumOperationFailure(error.message));
  }
}

function* deleteAlbumSaga(action) {
  try {
    yield call(apiClient.delete, `/albums/${action.payload}`);
    yield put(deleteAlbumSuccess(action.payload));
  } catch (error) {
    yield put(albumOperationFailure(error.message));
  }
}

export function* watchAlbumSagas() {
  yield takeLatest(fetchAlbumsRequest.type, fetchAlbumsSaga);
  yield takeLatest(fetchAlbumByIdRequest.type, fetchAlbumByIdSaga);
  yield takeLatest(createAlbumRequest.type, createAlbumSaga);
  yield takeLatest(updateAlbumRequest.type, updateAlbumSaga);
  yield takeLatest(deleteAlbumRequest.type, deleteAlbumSaga);
}