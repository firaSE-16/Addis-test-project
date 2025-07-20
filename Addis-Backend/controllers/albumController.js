const Album = require('../models/albumModel');
const Song = require('../models/songModel');


// Create a new album
const createAlbum = async (req, res) => {
  try {
    const { title, artist, year, genre, color } = req.body;
    const coverImage = req.file?.path;

    if(!title||!artist){
        res.status(403).json(album)
    }

    const album = new Album({
      title,
      artist,
      year,
      genre,
      coverImage,
      color
    });

    await album.save();
    res.status(201).json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get album by ID
const getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.albumId).populate('songs');
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update album
const updateAlbum = async (req, res) => {
  try {
    const { title, artist, year, genre, color } = req.body;
    
    const updateData = { title, artist, year, genre, color };

    const album = await Album.findById(req.params.albumId);
    
    if (!album) {
        return res.status(404).json({ error: 'Album not found' });}
       
        album.coverImage = req.file.path||album.coverImage;
    

    const updatedAlbum = await Album.findByIdAndUpdate(
         req.params.albumId,
         updateData,
      { new: true }
    );

    if (!updatedAlbum) {
      return res.status(404).json({ error: 'Album not found' });
    }

    res.json(updatedAlbum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete album
const deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params.albumId);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }

    await Song.deleteMany({ album: req.params.albumId });

    await Album.findByIdAndDelete(req.params.albumId);

    res.json({ message: 'Album and associated songs deleted successfully' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// get albums and songs with filters
const getAlbumsAndSongs = async (req, res) => {
  try {
    const { query, filter = 'album' } = req.query;

    let results = {};
    let totalAlbums;

    

    const page = parseInt(req.query.page)|| 1;
    const limit = parseInt(req.query.limit)||10;
    const skip = (page-1)*limit;   

    if (!query && filter === 'album') {
        results.albums = await Album.find().skip(skip).limit(limit);
        totalAlbums = await Album.countDocuments();
    }

    else if(!query && filter === 'song'){
        results.songs = await Song.find().populate('album').skip(skip).limit(limit);
        totalAlbums = await Song.songDocuments();
    
    }
    
    else{
        const searchQuery = {
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { artist: { $regex: query, $options: 'i' } }
      ]
    };
   
    switch (filter.toLowerCase()) {
      case 'song':
        results.songs = await Song.find(searchQuery).populate('album').skip(skip).limit(limit);
        totalAlbums = await Song.songDocuments();
        break;
      case 'album':        
        results.albums = await Album.find(searchQuery).skip(skip).limit(limit);
        totalAlbums = await Album.countDocuments();
        break;      
      default:
        results.albums = await Album.find(searchQuery).skip(skip).limit(limit);
        totalAlbums = await Album.countDocuments();
        break;
    }
}


    const totalPages = Math.ceil(totalAlbums / limit);

    const response = {
      data: results,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalAlbums,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
     };

    res.json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAlbum,  
  getAlbumById,
  updateAlbum,
  deleteAlbum,
  getAlbumsAndSongs
};