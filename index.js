const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('config-lite');
const routes = require('./routes');
const path = require('path');
const app = express();
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
// session 中间件
app.use(session({
  name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true,// 强制更新 session
  saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}));
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'),
  keepExtensions: true
}));

routes(app);
 app.listen(config.port, function() {
   console.log(`listening on port ${config.port}`);
 });
