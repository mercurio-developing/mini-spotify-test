const express = require("express");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");
const verifyJWT = require("../auth/verifyJWT").verifyJWT_MW;

const config = require("../../config/config");

router.post("/", verifyJWT, (req, res) => {
  let query = req.body.query;
  let token = req.user;
  const spotifyApi = new SpotifyWebApi({
    clientId: config.spotifyApi.clientId,
    clientSecret: config.spotifyApi.clientSecret,
    redirectUri: config.spotifyApi.redirectUri,
    accessToken: token
  });
  // Get an artist
  spotifyApi
    .search(query, ["track"], { limit: 10, offset: 1 })
    .then((data, err) => {
      if (data) {
        res.send(data.body).status(201);
      } else {
        res.send({ error: err });
      }
    })
    .catch(err => {
      res.send({ error: err });
    });
});

module.exports = router;
