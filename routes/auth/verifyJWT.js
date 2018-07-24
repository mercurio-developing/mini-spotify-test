const verifyJWTToken = require("./auth").verifyJWTToken;

function verifyJWT_MW(req, res, next) {
  let token =
    req.method === "POST" ? req.headers.authorization : req.query.token;
  verifyJWTToken(token)
    .then(decodedToken => {
      req.user = decodedToken.token;
      next();
    })
    .catch(err => {
      res.status(400).json({ message: "Invalid auth token provided." });
    });
}

module.exports.verifyJWT_MW = verifyJWT_MW;
