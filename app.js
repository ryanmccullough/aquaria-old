/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  user = require('./routes/user'),
  rpi = require('./routes/rpi'),
  graph = require('./routes/graph'),
  database = require('./routes/database'),
  http = require('http'),
  https = require('https'),
  path = require('path'),
  spdy = require('spdy'),
  fs = require('fs'),
  //gpio = require('pi-gpio'),
  nano = require('nano')('http://localhost:5984'),
  temperature = require('./routes/temperature');


var options = {
  key: fs.readFileSync(__dirname + '/keys/sample.privatekey.pem'),
  cert: fs.readFileSync(__dirname + '/keys/sample.ca.pem')
//ca: fs.readFileSync(__dirname + '/keys/cert.pem'),
//pfx: fs.readFileSync(__dirname + '/keys/test.pfx'),

  // SPDY-specific options
  //windowSize: 1024 // Server's window size
};

var db = nano.db.use('test');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.configure('development', function(){
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// set up temp log


// setup routes
app.get('/', routes.index);
app.get('/test', routes.test);
app.get('/about', routes.test);
app.get('/users', user.list);
app.get('/rpi', rpi.index);
app.get('/rpi/test', rpi.test);
app.get('/graph', graph.index);
app.get('/database', database.index);
app.get('/temp', temperature.index);

//var server = spdy.createServer(app);

//server.listen('port');

var spdyserver = spdy.createServer(options, app);
spdyserver.listen(3000, "::");
console.log('Listening on port 3000');
