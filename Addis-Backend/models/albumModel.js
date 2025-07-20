const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema(
    {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    artist: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
    },
    genre: {
      type: String,
    },
    coverImage: {
      type: String, 
    },color:{
        type:String,
        default:"#ffffff"
    }
  },
  { timestamps: true }

);

module.exports = mongoose.model('Album',albumSchema);
