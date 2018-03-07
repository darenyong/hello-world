var express = require('express');
var router = express.Router();

// home page
router.get('/', function (req, res, next) {
  res.json({title: 'hello-world'})
})

module.exports = router;
