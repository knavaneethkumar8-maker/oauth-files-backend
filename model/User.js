const mongoose = require('mongoose');
const { setThePassword } = require('whatwg-url');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  userId : {
    type : String,
    required : true
  },
  password : String
});


module.exports = mongoose.model('User',userSchema);