const jwt = require("jsonwebtoken");
const config = require("../../config/config");

function verifyJWTToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secretOrKey, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }
      resolve(decodedToken);
    });
  });
}

module.exports.verifyJWTToken = verifyJWTToken;
