const express = require("express");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");
const verifyJWT = require("../auth/verifyJWT").verifyJWT_MW;

const config = require("../../config/config");

router.get("/", verifyJWT, (req, res) => {
  let token = req.user;
  const spotifyApi = new SpotifyWebApi({
    clientId: config.spotifyApi.clientId,
    clientSecret: config.spotifyApi.clientSecret,
    redirectUri: config.spotifyApi.redirectUri,
    accessToken: token
  });
  // MyCurrentPlaybackState
  spotifyApi.getMyCurrentPlaybackState({}).then(
    function(data) {
      // Output items
      console.log("Now Playing: ", data.body);
    },
    function(err) {
      console.log("Something went wrong!", err);
    }
  );
});

module.exports = router;
