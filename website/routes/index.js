
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('user', { title: 'Asimi JS', users: req.users});
};
