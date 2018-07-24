require("dotenv").load();

module.exports = {
  spotifyApi: {
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    redirectUri: process.env.redirectUri
  },
  secretOrKey: process.env.secretOrKey
};
