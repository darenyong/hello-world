var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');

// home page
router.get('/', function (req, res, next) {
  console.log('GET hello', moment().tz('America/Edmonton').format('YYYY-MM-DD HH:mm:ss'));
  res.json({title: 'hello-world'});
});

module.exports = router;
