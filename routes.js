var init = function(app) {
  // all things routing
  var home = require('./routes/home'),
    user = require('./routes/user'),
    post = require('./routes/post'),
    Posts = require('./model/post');

  // can haz routes?
  app.use(app.router);

  // home page
  app.get('/', home.index);

  // "standard" post view yyyy/mm/dd/slug
  app.get('/posts/:year/:month/:day/:slug', post.show);

  // permalink -- use oid
  app.get('/post/:id', post.show);

  // show all posts (paginated)
  app.get('/posts', post.index);

  // TODO: remove this
  app.get('/users', user.list);
};

exports.init = init;