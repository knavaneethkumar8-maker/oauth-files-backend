const multer = require('multer');

const storage = multer.diskStorage({
  destination : (req, file, cb) => {
    if(file.fieldname === 'images') {
      cb(null, 'uploads/');
    }else if(file.fieldname === 'files') {
      cb(null, 'uploads/files/');
    }
  },
  filename : (req, file, cb) => {
    cb(null, file.originalname);
  }
});


const upload = multer({storage});

module.exports = upload;