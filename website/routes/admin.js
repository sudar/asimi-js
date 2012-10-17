
/*
 * GET home page.
 */

exports.admin = function(req, res){
  res.render('admin', { title: 'Asimi JS', users: req.users});
};
