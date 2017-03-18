module.exports = function (app) {
  // app.use(function (req, res, next) {
  //   next();
  // });
  app.get('/', function (req, res) {
    res.end('hello!!!');
  });
  //app.use('/login', require('./login'));
  app.use('/posts', require('./posts'));
};
