const express = require('express');
const router = express.Router();
const path = require('path');
const uploadController = require('../controllers/uploadController');


router.route('/')
      .post(uploadController.handleUploads);

router.route('/dropped')
      .post(uploadController.handleDropUploads);


module.exports = router;