/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Raspberry Pi' });
};

exports.test = function(req, res){
  res.render('index', { title: 'Raspberry Pi with TESTING' });
};