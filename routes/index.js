
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Index' });
};

exports.test = function(req, res){
  res.render('index', { title: 'INDEX.js/test export function' });  
};

exports.about = function(req, res){
    res.render('about', { title: 'INDEX.js/about export function' });
};