var Waterline = require('waterline');
var waterlineConfig = require('./waterline-config')
var http = require('http');
var express = require('express');
var config = require('config');
var routes = require('./routes');

const port = process.env.port || '8080';


Waterline.start(waterlineConfig, function (err, orm) {
  if (err) {
    console.error('could not start waterline\n', err);
    return process.exit(1);
  }

  var app = express();

  app.use('/', routes);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var url = decodeURI(req.url);
    var query = JSON.stringify(req.query);
    console.log('method', req.method, 'url', url, 'query', query);

    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function (err, req, res, next) {
    const response = req.app.get('env') === 'development' ? {} : err;
    res.status(err.status || 500);
    next(response);
  });

  var server = http.createServer(app);
  server.listen(port, function (err) {
    if (err) {
      console.error('failed to lift express');
      console.error('attempting to shutdown waterline');
      Waterline.stop(orm, function (err) {
        console.error('unexpected failure attempting to shutdown waterline. Details:', err);
        return process.exit(1);
      });
      console.info('waterline shutdown successfully');
      return process.exit(1);
    }

    // success starting express
    console.log('db config\n', config.dbConfig);
    console.log('express running');

    var message = Waterline.getModel('message', orm);

    // TODO: test create a message
    message
      .create({text: 'hello-world'})
      .meta({fetch: true})
      .exec(function (err, msg) {
        if (err) return console.error('error creating message');
        console.log('created', msg);
      });

    message.find().exec(function (err, msgs) {
      console.log('messages', msgs);
    });

  });

});
