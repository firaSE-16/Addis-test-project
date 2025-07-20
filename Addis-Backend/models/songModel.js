const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
    },
    audioUrl: {
      type: String, 
      required: true,
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Song', songSchema);
