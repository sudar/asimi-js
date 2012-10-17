
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Asimi JS', users: req.users});
};
