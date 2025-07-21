import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  albums: [],
  currentAlbum: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
};

const albumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    fetchAlbumsRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchAlbumByIdRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createAlbumRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateAlbumRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteAlbumRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchAlbumsSuccess: (state, action) => {
      state.loading = false;
      state.albums = Array.isArray(action.payload.data) ? action.payload.data : [];
      state.pagination = action.payload.pagination || initialState.pagination;
    },
    fetchAlbumByIdSuccess: (state, action) => {
      state.loading = false;
      state.currentAlbum = action.payload;
    },
    createAlbumSuccess: (state, action) => {
      state.loading = false;
      state.albums.unshift(action.payload);
    },
    updateAlbumSuccess: (state, action) => {
      state.loading = false;
      const index = state.albums.findIndex(a => a._id === action.payload._id);
      if (index !== -1) {
        state.albums[index] = action.payload;
      }
      if (state.currentAlbum?._id === action.payload._id) {
        state.currentAlbum = action.payload;
      }
    },
    deleteAlbumSuccess: (state, action) => {
      state.loading = false;
      state.albums = state.albums.filter(a => a._id !== action.payload);
      if (state.currentAlbum?._id === action.payload) {
        state.currentAlbum = null;
      }
    },
    albumOperationFailure: (state, action) => {
      state.loading = false;
      // If error message contains 404, show user-friendly message
      if (action.payload && action.payload.toString().includes('404')) {
        state.error = 'There is no album.';
      } else {
        state.error = action.payload;
      }
    },
    resetAlbumState: () => initialState,
  },
});

export const {
  fetchAlbumsRequest,
  fetchAlbumByIdRequest,
  createAlbumRequest,
  updateAlbumRequest,
  deleteAlbumRequest,
  fetchAlbumsSuccess,
  fetchAlbumByIdSuccess,
  createAlbumSuccess,
  updateAlbumSuccess,
  deleteAlbumSuccess,
  albumOperationFailure,
  resetAlbumState,
} = albumSlice.actions;

export default albumSlice.reducer;


