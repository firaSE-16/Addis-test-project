const Song = require('../models/songModel');
const Album = require('../models/albumModel');

// Add new song to album
const addSongToAlbum = async (req, res) => {
  try {
    const { title, duration } = req.body;
    const { albumId } = req.params;

    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Audio file is required' });
    }

    const audioUrl = req.file?.path;

    const song = new Song({
      title,
      duration,
      audioUrl,
      album: albumId
    });

    await song.save();
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update song
const updateSong = async (req, res) => {
  try {
    const { songId } = req.params;
    const { title, duration } = req.body;

    const updatedSong = await Song.findByIdAndUpdate(
      songId,
      { title, duration },
      { new: true, runValidators: true }
    ).populate('album');

    if (!updatedSong) {
      return res.status(404).json({ error: 'Song not found' });
    }

    res.json(updatedSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete song
const deleteSong = async (req, res) => {
  try {
    const { songId } = req.params;

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    await Song.findByIdAndDelete(songId);
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addSongToAlbum,
  updateSong,
  deleteSong
};