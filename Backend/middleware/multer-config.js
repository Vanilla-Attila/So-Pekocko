// Uploading files
const multer = require('multer');

// map for extention
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// How to save the files
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Error (no error), folder
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    // Filename, space replaces with underscore
    const name = file.originalname.split(' ').join('_');
    // extention
    const extension = MIME_TYPES[file.mimetype];
    //  Full filename
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');