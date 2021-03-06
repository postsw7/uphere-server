var express = require('express');
var app = express();
var server = require('http').createServer(app);

var env = process.env.NODE_ENV || 'development';

app.disable('etag');

// credentials
var db = require('./config/database')(env);
require('./database').connect(db.url);

// Middlewares
require('./middlewares')(app);

// Routes
require('./config/routes')(app);

// WebSocket
require('./sockets')(server);

// Start server
server.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Express listening on port http://%s:%s', host, port);
});

module.exports = app;
