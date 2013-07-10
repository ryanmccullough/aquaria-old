/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , rpi = require('./routes/rpi')
  , http = require('http')
  , https = require('https')
  , path = require('path')
  , spdy = require('spdy')
  , fs = require('fs')
  , nano = require('nano')('http://localhost:5984');


var options = {
  key: fs.readFileSync(__dirname + '/keys/privatekey.pem'),
  cert: fs.readFileSync(__dirname + '/keys/ca.pem'),
//ca: fs.readFileSync(__dirname + '/keys/cert.pem'),
//pfx: fs.readFileSync(__dirname + '/keys/test.pfx'),

  // SPDY-specific options
  windowSize: 1024 // Server's window size
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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/rpi', rpi.index);
app.get('/rpi/test', rpi.test);
//app.get('/testing', test.test);
//Testing out the template and MVC system.
app.get('/testing', function(req, res){
  res.render('index.jade', { title: 'Testing' });
});
//About page FIND OUT HOW TO SERVE STATIcS
app.get('/about', function(req, res){
  res.render('about.jade', { title: 'About' });
});

//var server = spdy.createServer(app);

//server.listen('port');

var spdyserver = spdy.createServer(options, app);
spdyserver.listen(3000);
console.log('Listening on port 3000');
