var mongoose = require('mongoose');
var util = require('util');

if (!mongoose.connection.db) {
  var dbURI = util.format("mongodb://%s:%s@ds0%d.mongolab.com:%d/%s",
                          process.env.MONGO_USER,
                          process.env.MONGO_PASSWORD,
                          process.env.MONGO_PORT,
                          process.env.MONGO_PORT,
                          process.env.MONGO_COLLECTION);

  mongoose.connect(dbURI);

  mongoose.connection.on('connected', function() {
    console.log("Mongoose connected to: " + dbURI);
  });

  mongoose.connection.on('disconnected', function() {
    console.log("Mongoose disconnected");
  });

  process.on("SIGINT", function() {
    mongoose.connection.close(function () {
      console.log("Mongoose disconnceted through app termination");
    });
    process.exit(0);
  });
}

exports.mongoose = mongoose;