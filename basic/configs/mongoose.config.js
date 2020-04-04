//require mongoose module
var mongoose = require('mongoose');
var dbconfig = require('./mongo.config');

//require chalk module to give colors to console text
var chalk = require('chalk');

//construct database URL from config file
var env = process.env.NODE_ENV || 'development';
var server = dbconfig[env]['database']['host'];
var port = dbconfig[env]['database']['port'];
var database = dbconfig[env]['database']['db'];
var dbURL = `mongodb://${server}:${port}/${database}`;

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

//export this function and imported by server.js
var config = {
    initDB: function() {

        mongoose.connect(dbURL);

        mongoose.connection.on('connected', function(){
            console.log(connected("Mongoose default connection is open to ", dbURL));
        });

        mongoose.connection.on('error', function(err){
            console.log(error("Mongoose default connection has occured "+err+" error"));
        });

        mongoose.connection.on('disconnected', function(){
            console.log(disconnected("Mongoose default connection is disconnected"));
        });

        process.on('SIGINT', function(){
            mongoose.connection.close(function(){
                console.log(termination("Mongoose default connection is disconnected due to application termination"));
                process.exit(0)
            });
        });
    }
}

module.exports = config;