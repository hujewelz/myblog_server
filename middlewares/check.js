module.exports = function checkLogin(req, res, next) {
    //if (!req.session.user) {
      next(new Error('未登录'));
    //}
  
};
