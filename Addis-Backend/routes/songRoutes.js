const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const upload = require('../utils/multer');

router.post('/:albumId/songs', upload.single('audio'), songController.addSongToAlbum); 
router.put('/songs/:songId', songController.updateSong);
router.delete('/songs/:songId', songController.deleteSong);


module.exports = router;