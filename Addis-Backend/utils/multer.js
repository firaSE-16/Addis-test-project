const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');

const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'uploads',
        resource_type:'auto',
        allowed_formats:['jpg','jpeg','png','mp3','wav']
    }
})

const upload = multer({storage})
module.exports = upload