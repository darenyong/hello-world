var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');
var publicKey =  fs.readFileSync(path.join(__dirname, '..', 'darenyong.pem'), 'utf-8');


// var secret = jwks.expressJwtSecret({
//   cache: true,
//   rateLimit: true,
//   jwksRequestsPerMinute: 5,
//   jwksUri: "https://darenyong.auth0.com/.well-known/jwks.json"
// });

// home page
router.get('/', function (req, res, next) {
  console.log('GET hello', moment().tz('America/Edmonton').format('YYYY-MM-DD HH:mm:ss'));

  console.log('publicKey', publicKey);
  console.log('cookies', req.cookies);
  const cookie = req.cookies['daren-auth-token'];
  console.log('daren-auth-token', cookie);

  jwt.verify(cookie, publicKey, { algorithms: ['RS256'] }, function(err, decoded) {
    if (err) {
      console.log('verify token failed');
      res.status(400);
      res.json({msg: 'failed to verify token'});
      return;
    }
    console.log('decoded', decoded);
    res.json({title: 'hello-world'});
  });
});

module.exports = router;
