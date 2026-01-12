const {upload, uploadDrops} = require('../middleware/discStorageMulter.js');
const multer = require('multer');
const MulterError = multer.MulterError;



const handleUploads = (req, res) => {
  upload.fields([{name : 'images'},{name : 'files'}])(req, res,(err) => {
    if(err) {
      console.log(err instanceof MulterError);
      console.log(err.code);
      return res.status(400).json({"message" : `${err.message}`});
    }

    console.log('file uploaded');
    console.log(req.files);
    res.status(200).json({"message" : "successfully uploaded the files"});
  });
}



const handleDropUploads = (req, res) => {
  uploadDrops.array('drops')(req, res, (err)=> {
    if(err instanceof MulterError) {
      console.log(err.message);
      res.status(400).json({"message" : `Multer Error : ${err}`, "error" : err});
    }
    console.log('reached the route');
    console.log(req.files);
    if(!req.files.length) {
      return res.status(400).json({"message" : "no files present"});
    } 
    res.status(200).json({"message" : "succesfullly uploaded the dropedd data"});
  });
}

module.exports = {handleDropUploads, handleUploads};