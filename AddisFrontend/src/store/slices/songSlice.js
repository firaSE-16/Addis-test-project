import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  songs: [],
  currentSong: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
};

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchSongByIdRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    addSongToAlbumRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateSongRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteSongRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action) => {
      state.loading = false;
      state.songs = Array.isArray(action.payload.data) ? action.payload.data : [];
      state.pagination = action.payload.pagination || initialState.pagination;
    },
    fetchSongByIdSuccess: (state, action) => {
      state.loading = false;
      state.currentSong = action.payload;
    },
    addSongToAlbumSuccess: (state, action) => {
      state.loading = false;
      state.songs.unshift(action.payload);
    },
    updateSongSuccess: (state, action) => {
      state.loading = false;
      const index = state.songs.findIndex(s => s._id === action.payload._id);
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      if (state.currentSong?._id === action.payload._id) {
        state.currentSong = action.payload;
      }
    },
    deleteSongSuccess: (state, action) => {
      state.loading = false;
      state.songs = state.songs.filter(s => s._id !== action.payload);
      if (state.currentSong?._id === action.payload) {
        state.currentSong = null;
      }
    },
    songOperationFailure: (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.toString().includes('404')) {
        state.error = 'There is no song.';
      } else {
        state.error = action.payload;
      }
    },
    // Reset actions
    resetSongState: () => initialState,
  },
});

export const {
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
  resetSongState,
} = songSlice.actions;

export default songSlice.reducer;