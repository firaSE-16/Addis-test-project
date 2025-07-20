const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');
const upload = require('../utils/multer');


router.post('/album', upload.single('cover'), albumController.createAlbum); 
router.get('/album/:albumId', albumController.getAlbumById);
router.put('/album/:albumId', upload.single('cover'), albumController.updateAlbum);
router.delete('/album/:albumId', albumController.deleteAlbum); 
router.get('/search', albumController.getAlbumsAndSongs);

module.exports = router;
