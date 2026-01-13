const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConn');
const cors = require('cors');
const corsOptions = require('./config/corsConfig');
const logger = require('./middleware/logEvents');
const passport = require('passport');
const googleStrategy = require('./middleware/googleStrategy');
const googleCallbackHandler = require('./middleware/googleAuth');
const {upload, uploadDrops} = require('./middleware/discStorageMulter');
const { MulterError } = require('multer');

dotenv.config();
const PORT = process.env.PORT || 3500;

//config
connectDB();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(logger);
app.use(express.static(path.join(__dirname, 'public')));

//middleware
//oauth
passport.use(googleStrategy);
//routes
app.get('/auth/google', 
  passport.authenticate('google', {scope : ["profile", "email"]})
);

app.get('/auth/google/callback', 
  passport.authenticate('google', {session : false}),
  googleCallbackHandler
);

app.get('/:userId/profile', require('./middleware/renderProfile'));


app.use('/upload', require('./routes/uploads'));

app.use('/upload/dropped',require('./routes/uploads'));

app.get('/download/:fileName',(req, res) => {
  console.log('file download sent');
  const filePath = path.join(__dirname, 'downloads', req.params.fileName);
  res.setHeader('Content-Disposition', 'attachment');
  res.sendFile(filePath);
});

app.get('/', (req, res) => {
  console.log('request came');
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get('/myfile', (req, res) => {
  console.log('request came');
  res.sendFile('myfile.html');
});

app.use(/\/*/, (err, res, req, next) => {
  if(err) {
    console.log('error occured');
    return res.status(400).json({"message" : `${err.message}`});
  }
  next();
});

mongoose.connection.once('open', () => {
  console.log('Server connected to database');
  app.listen(PORT, () => {
    console.log(`Server running in the port ${PORT}`);
  });
});

