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

var db = nano.db.use('datalog');

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
// Read current temperature from sensor
function readTemp(callback){
    fs.readFile('/sys/bus/w1/devices/28-000004a82865/w1_slave', function(err, buffer)
    {
        if (err){
            console.error(err);
            process.exit(1);
        }

        // Read data from file (using fast node ASCII encoding).
        var data = buffer.toString('ascii').split(" "); // Split by space

        // Extract temperature from string and divide by 1000 to give celsius
        var temp  = parseFloat(data[data.length-1].split("=")[1])/1000.0;

        // Round to one decimal place
        temp = Math.round(temp * 10) / 10;

        // Add date/time to temperature
        //var data = {
        //    temperature_record:[{
        //       unix_time: Date.now(),
        //        celsius: temp
        //    }]};
        console.log(String(temp));
        // Execute call back with data
        callback(String(temp));
    });
}

// Create a wrapper function which we'll use specifically for logging
function logTemp(interval){
    // Call the readTemp function with the insertTemp function as output to get initial reading
    readTemp(insertTemp);
    // Set the repeat interval (milliseconds). Third argument is passed as callback function to first (i.e. readTemp(insertTemp)).
    setInterval(readTemp, interval, insertTemp);
}

// Write a single temperature record in JSON format to database table.
function insertTemp(data){
    // data is a javascript object
    db.insert({ temp: data }, function(err, body) {
        if (!err)
            console.log(body);
    });
}
// setup routes
app.get('/', routes.index);
app.get('/test', routes.test);
app.get('/about', routes.about);
app.get('/users', user.list);
app.get('/rpi', rpi.index);
app.get('/rpi/test', rpi.test);
app.get('/graph', graph.index);
app.get('/database', database.index);
app.get('/temp', temperature.index);

var msecs = 1000; // log interval duration in milliseconds
logTemp(msecs);

var spdyserver = spdy.createServer(options, app);
spdyserver.listen(3000, "::");
console.log('Listening on port 3000');
