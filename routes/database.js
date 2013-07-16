var fs = require('fs');
var sys = require('sys');
var http = require('http');
var nano = require('nano')('http://localhost:5984');

var db = nano.db.use('datalog');
/*
exports.clear = function(req, res){
    db.destroy('')
    res.render('database', { title: 'Database' });
};
*/