const express = require("express");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");

const spotifyApi = new SpotifyWebApi({
  clientId: config.spotifyApi.clientId,
  clientSecret: config.spotifyApi.clientSecret,
  redirectUri: config.spotifyApi.redirectUri
});

router.post("/login", (req, res) => {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-read-currently-playing",
    "user-read-playback-state"
  ];
  // Create the authorization URL
  let authorizeURL = spotifyApi.createAuthorizeURL(scopes);
  res.send(authorizeURL).status(201);
});

router.get("/callback", (req, res) => {
  let code = req.query.code;
  // Retrieve an access token
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data, err) => {
      if (err) {
        res.send({ error: "SERVER ERROR" }).status(500);
      } else {
        let token = data.body["access_token"];
        let expires_in = data.body["expires_in"];
        let jwtToken = jwt.sign(
          {
            token
          },
          config.secretOrKey,
          { expiresIn: expires_in }
        );
        res.redirect("http://localhost:3000/login" + `?token=${jwtToken}`);
      }
    })
    .catch(err => res.send({ error: err }));
});

module.exports = router;
