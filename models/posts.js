const Post = require('../lib/mongo').Post;

module.exports = {
  create: function (post) {
    return Post.create(post).exec();
  },
  getPostById: function (postId) {
    return Post
      .findOne({ _id: postId})
      .populate({ path: 'author', model: 'User' })
      .createAt()
      .exec();
  },
  getPosts: function (author) {
    const query = {};
    if (author) {
      query.author = author;
    }
    return Post
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ _id: -1 })
      .createAt()
      .exec();
  }
};
