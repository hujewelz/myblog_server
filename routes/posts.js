const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/check');
const PostModel = require('../models/posts');
const errorHandler = require('../middlewares/error-handler');

// 获取所有文章
router.get('/', function (req, res, next) {
  const author = req.query.author;

  PostModel.getPosts(author)
    .then(function (posts) {
      res.jsonp({
        code: 0,
        result: posts,
        msg: ''
      });
    })
    .catch(next);
});

router.get('/:id', function (req, res, next) {
  const ID = req.params.id;
  console.log(`post id ${ID}`);
  PostModel.getPostById(ID)
    .then(function (post) {
      if (!post) {
        throw new Error('post not exist');
      }
      res.jsonp({
        code: 0,
        result: post,
        msg: ''
      });
    })
    .catch(next);
})

// 新建文章
router.post('/', function (req, res, next) {
  const author = '';//req.session.user._id;
  const title = req.fields.title;
  const content = req.fields.content;
  // 校验参数
  try {
    if (!title.length) {
      throw new Error('请填写标题');
    }
    if (!content.length) {
      throw new Error('请填写内容');
    }
  } catch (e) {
    return res.jsonp({
      code: 110,
      msg: 'params not allowed'
    });
  }

  const post = {
    author: author,
    title: title,
    content: content
  };

  PostModel.create(post)
    .then(function (result) {
      // 此 post 是插入 mongodb 后的值，包含 _id
      console.log(`post: ${JSON.stringify(post)}, result: ${JSON.stringify(result)}`);
      const resPost = result.ops[0];
      res.jsonp({
        code: 0,
        result: resPost,
        msg: 'add succeed'
      });
    })
    .catch(next);
});

// 更新文章
router.put('/:id', checkLogin, errorHandler, function (err, req, res, next) {
  console.log('put'+req.params.id);
  res.jsonp({ msg: `update ${req.params.id} succeed` });
});

// 删除文章
router.delete('/:id', checkLogin, errorHandler, function (err, req, res, next) {
  console.log('delete'+req.params.id);
  res.jsonp({ msg: `delete ${req.params.id} succeed` });
});

module.exports = router;
