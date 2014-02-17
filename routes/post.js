
var moment = require('moment');
var util = require('util');
var mongoose = require('mongoose');
var Posts = require('../model/post').Posts;

exports.show = function(req, res){
  var dateString, startDate, endDate,
    query = Posts().published.byPublishDate;

  if (req.params.id) {
    query = query.where('_id').equals(req.params.id);
  } else if (req.params.slug) {
    dateString = util.format("%d-%d-%d", req.params.year, req.params.month, req.params.day);
    startDate = moment(dateString);
    endDate = moment(startDate).add('days', 1);
    query = query
      .where('publishedOn').gte(startDate.toDate()).lt(endDate.toDate())
      .where('slug').equals(req.params.slug)
      ;
  }

  query.findOne(function(err, found) {
    if (err) {
      throw err;
    } else {
      res.render('posts/show', {post: found, req: req});
    }
  });
};

exports.index = function(req, res) {
  res.render('posts/index', {posts: req.latest, req: req});
};