//require mongoose module
import mongoose from 'mongoose';
import { dbconfig } from './mongo.config';

//require chalk module to give colors to console text
import chalk from 'chalk';

//construct database URL from config file
const env = process.env.NODE_ENV || 'development';
const server = dbconfig[env]['database']['host'];
const port = dbconfig[env]['database']['port'];
const database = dbconfig[env]['database']['db'];
const dbURL = `mongodb://${server}:${port}/${database}`;

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

//export this function and imported by server.js
const config = {
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

export default config;