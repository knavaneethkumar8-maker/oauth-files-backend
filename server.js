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
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const storeUserDetails = require('./middleware/storeUser');

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
passport.use(new GoogleStrategy({
  clientID : process.env.GOOGLE_CLIENT_ID,
  clientSecret : process.env.GOOGLE_CLIENT_SECRET,
  callbackURL : '/auth/google/callback'
}, async(accessToken, refreshToken, profile, done) => {
  const user = {
    username : profile.displayName,
    email : profile.emails[0].value
  };
  storeUserDetails(user);
  console.log('profile sent');
  return done(null, user);
}));




//routes
app.get('/auth/google', 
  passport.authenticate('google', {scope : ["profile", "email"]})
);

app.get('/auth/google/callback', 
  passport.authenticate('google', {session : false}),
  (req, res) => {
    console.log(req.user);
    console.log(req.user.username);
    console.log(req.user.email);
    res.redirect('/myfile.html');
  }
);



app.get('/', (req, res) => {
  console.log('request came');
  res.sendFile(path.join(__dirname, "views", "index.html"))
});

app.get('/myfile', (req, res) => {
  console.log('request came');
  res.sendFile('myfile.html');
});


mongoose.connection.once('open', () => {
  console.log('Server connected to database');
  app.listen(PORT, () => {
    console.log(`Server running in the port ${PORT}`);
  });
});

