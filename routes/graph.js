var temperature = require('./temperature');
var nano = require('nano')('http://localhost:5984');

var db = nano.db.use('datalog');

exports.index = function(req, res){
  res.render('graph', { title: 'Graph' });
};

exports.test = function(req, res){
    temperature.doselectTemp(function(data){
        //var data = JSON.stringify(data);
        res.render('graph/graphtest', { title: 'Graph TESTING COUCHDB', tempdata: data });
    });
};

exports.getJSON = function(req, res){
    temperature.doselectTemp(function(data){
        res.jsonp(data);
    })
};
/*
exports.test = function(req, res){
  temperature.doselectTemp(data);
  res.render('graphtest', { title: 'Graph TESTING COUCHDB', tempdata: data });
};
*/