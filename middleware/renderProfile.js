const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const User = require('../model/User');



const generateProfileHTML = async (req, res) => {
  console.log('came to html generation');
  const {userId} = req.params;
  const foundUser= await User.findOne({userId});
  if(!foundUser) return res.sendStatus(404);
  let html = fs.readFileSync(path.join(__dirname, "..", "public", "profile.html"), "utf-8");
  html = html.replace('{{user}}', foundUser.username )
              .replace('{{email}}', foundUser.email);

  res.send(html);
}


module.exports = generateProfileHTML;