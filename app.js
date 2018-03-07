var http = require('http');
var express = require('express');
var routes = require('./routes');
var app = express();

const port = process.env.port || '8080';

app.use('/', routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  next(err);
});

var server = http.createServer(app);
server.listen(port);
