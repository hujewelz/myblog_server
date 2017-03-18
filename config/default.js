module.exports = {
  port: 3000,
  session: {
    secret: 'blog',
    key: 'blog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:1234/blog'
};
