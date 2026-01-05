const User = require('../model/User');


const storeUserDetails = async (user) => {
  const foundUser = await User.findOne({email : user.email});
  if(!foundUser) {
    const newUser = await User.create({
      username : user.username,
      email : user.email
    });
  } else {
    return console.log('user already exists');
  }

  console.log('stored user to database');
}


module.exports = storeUserDetails;