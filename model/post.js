var mongoose = require('./db').mongoose;

if (mongoose.modelNames().indexOf('Post') == -1) {
  var moment = require('moment'),
    util = require('util'),
    postsQuery,
    postSchema;

  console.log('Building Post schema...');
  postSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    slug: String,
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date },
    publishedOn: { type: Date }
  });

  postSchema.statics.typedQuery = function() {
    return postsQuery();
  };

  postSchema.statics.published = function() {
    return postsQuery().published.sort('-publishedOn');
  };

  postSchema.statics.unpublished = function() {
    return this.where('publishedOn').exists().lte(Date.now()).sort('-publishedOn');
  };

  postSchema.virtual('permalink').get(function () {
    return util.format("/post/%s", this.id);
  });

  postSchema.virtual('link').get(function() {
    var published = moment(this.publishedOn);
    return '/posts/' + published.format('YYYY/MM/DD/') + this.slug;
  });

  postSchema.virtual('commentsCount').get(function() {
    return 23;
  });

  console.log('Registering schema for model Post...');
  mongoose.model('Post', postSchema);
  
  postsQuery = mongoose.model('Post').find().toConstructor();;

  postsQuery.prototype.inDateRange = function (startDateRaw, durationString, howLong) {
    var startDate = moment(startDateRaw)
      endDate = moment(startDate).add('days', 1);

    this.where('publishedOn').gte(startDate.toDate()).lt(endDate.toDate());
    return this;
  };

  postsQuery.prototype.latest = function(howMany) {
    this.byPublishDate.limit(howMany);
    return this;
  };

  postsQuery.prototype.publishedBefore = function(endDateRaw, inclusive) {
    var endDate = moment(endDateRaw).toDate();
    inclusive ? this.where('publishedOn').lte(endDate) : this.where('publishedOn').lt(endDate);
    
    return this;
  };

  postsQuery.prototype.publishedAfter = function(startDateRaw, inclusive) {
    var startDate = moment(startDateRaw).toDate();
    inclusive ? this.where('publishedOn').gte(startDate) : this.where('publishedOn').gt(startDate);
    
    return this;
  };

  Object.defineProperty(postsQuery.prototype, 'published', {
    get: function () {
      this.publishedBefore(Date.now());
      return this;
    }
  });

  Object.defineProperty(postsQuery.prototype, 'byPublishDate', {
    get: function () {
      this.sort('-publishedOn');
      return this;
    }
  });
};

exports.Posts = mongoose.model('Post').typedQuery

// middleware to fetch the top five latest blog posts and put them into the request 
exports.middleware = function(req, res, next) {
console.log("In middleware...");
  exports.Posts().latest(5).find(function(err, posts) {
    console.log("In Posts().latest(5).find...");
    if (err) {
      throw err;
    } else {
      console.log('req.latest: ' + req.latest);
      req.latest = posts;
      next();
    }
  });
};