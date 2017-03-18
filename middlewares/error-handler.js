module.exports = function errorHandler (err, req, res, next){
  res.status(500);
  res.jsonp({
    code: -1,
    msg: 'please login first!!!'
  });
};
