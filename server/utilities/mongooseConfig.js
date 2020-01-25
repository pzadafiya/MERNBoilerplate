var mongoose = require('mongoose');
mongoose.set('debug', true);
var config = require("../Utilities/config").config;

module.exports = function() {
    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);
    var db = mongoose.connect(config.DB_URL.url, { useNewUrlParser: true, useUnifiedTopology: true});
    require('../models/User');
    
    mongoose.connection.once('open', function() {
        console.log("MongoDB database connection established successfully");
    });
    

    return db;
};