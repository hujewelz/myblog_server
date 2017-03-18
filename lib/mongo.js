const config = require('config-lite');
const Mongolass = require('mongolass');
const moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');
const mongolass = new Mongolass();
mongolass.connect(config.mongodb);

// 根据 id 生成创建时间 created_at
mongolass.plugin('createAt', {
  afterFind: function(res) {
    res.forEach(function(item) {
      item.create_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
    });
    return res;
  },
  afterFindOne: function(res) {
    if (res) {
      res.create_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
    }
    return res;
  }
});

exports.User = mongolass.model('User', {
  name: {type: 'string'},
  password: {type: 'string'},
  avatar: {type: 'string'},
  bio: {type: 'string'}
});
exports.User.index({ name: 1}, { unique: true}).exec(); // 根据用户名找到用户，用户名全局唯一

exports.Post = mongolass.model('Post', {
  author: {type: Mongolass.Types.ObjectId},
  title: {type: 'string'},
  content: {type: 'string'}
});
exports.Post.index({ author: 1, _id: -1}).exec(); // 按创建时间降序查看用户的文章列表
