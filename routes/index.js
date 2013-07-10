
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Index' });
};

exports.test = function(req, res){
  res.render('index', { title: 'INDEX.js/test export function' });  
};