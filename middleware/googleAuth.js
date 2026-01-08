

const googleCallbackHandler = (req, res) => {
  const user = req.user;
  const userId = user.userId;
  res.redirect(`https://oauth-files-media.vercel.app/${userId}/profile`);
}


module.exports = googleCallbackHandler;