 /*jslint node: true */

// kinda important
var express = require('express');

// all things data
var postsModule = require('./model/post');
var Posts = postsModule.Posts;

// all things templating
var hbs = require('express-hbs');

// routing
var routes = require('./routes');

// misc extra stuff you gotta have
var http = require('http');
var path = require('path');

// create the app
var app = express();

hbs.registerHelper('setPageType', function(pageType) {
  this.pageType = pageType;
});

var randomStrings = {
  homePageSubcaption: [
    '...to the jankiest blog on earth',
    '...to the lair of the elusive Tom ForNow',
    '...to the <em>incredible, edible egg!</em>'
    ],
  postsIndexSubcation: [
    'the jankiest blog on earth',
    'the lair of the elusive Tom ForNow',
    'BITCHEZ!!',
    'all hat, no cattle!'
  ]
};

hbs.registerHelper('randomString', function(whichSet) {
  var stringSet = randomStrings[whichSet];
  if (stringSet) {
    return stringSet[Math.floor(Math.random()*stringSet.length)];
  }
});

// default port 3000 unless PORT set in the environment
app.set('port', process.env.PORT || 3000);

// use Handlebars for templating
var engine = hbs.express3({
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts',
  beautify: true
});
app.engine('hbs', engine);

// views go here
app.set('views', path.join(__dirname, 'views'));

// actually USE Handlebars...
app.set('view engine', 'hbs');

// show me cool stuffs at the console
app.use(express.logger('dev'));

// silly little icon in the silly little corner
app.use(express.favicon());

// serve JSON, bitchez
app.use(express.json());

// honestly no idea what these two do
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(postsModule.middleware);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//static assets, mounted under "assets" for easy deployment to e.g. an nginx server
app.use('/assets', express.static(path.join(__dirname, 'public')));

// set up routing
routes.init(app);

// let's make it hap'n, cap'n!
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});