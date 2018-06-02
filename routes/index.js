var express = require('express');
var router = express.Router();
// var moment = require('moment-timezone');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');

var publicKey = fs.readFileSync(path.join(__dirname, '..', 'darenyong.pem'), 'utf-8');

// home page
router.get('/', function (req, res, next) {
  // console.log('GET hello', moment().tz('America/Edmonton').format('YYYY-MM-DD HH:mm:ss'));
  const cookie = req.cookies['daren-auth-token'];

  if (!cookie) {
    res.status(401);
    res.send('hello-world no cookie provided');
    return;
  }

  console.log('cookie found, verifying...');
  jwt.verify(cookie, publicKey, { algorithms: ['RS256'] }, function(err, decoded) {
    if (err) {
      console.log('verify token failed');
      res.status(401);
      res.send('token not valid or expired');
      return;
    }
    // TODO: token - confirm issuer, audience, and scope
    console.log('verify token success', decoded);
    res.json({title: 'hello-world'});
  });
});

module.exports = router;
