const GoogleStrategy = require('passport-google-oauth20').Strategy;
const storeUserDetails = require('./storeUser');
require('dotenv').config();

const googleStrategy = new GoogleStrategy({
  clientID : process.env.GOOGLE_CLIENT_ID,
  clientSecret : process.env.GOOGLE_CLIENT_SECRET,
  callbackURL : '/auth/google/callback'
}, async(accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  const user = {
    username : profile.displayName,
    email,
    userId : email.split('@')[0]
  };
  storeUserDetails(user);
  console.log('profile sent');
  return done(null, user);
});


module.exports = googleStrategy;