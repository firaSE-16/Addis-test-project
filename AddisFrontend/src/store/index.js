import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import albumReducer from './slices/albumSlice';
import songReducer from './slices/songSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        albums: albumReducer,
        songs: songReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'albums/createAlbumRequest',
                    'albums/updateAlbumRequest',
                    'songs/addSongToAlbumRequest',
                    'songs/updateSongRequest',
                ],
            },
        }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;