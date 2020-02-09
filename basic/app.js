var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
const { check, validationResult } = require('express-validator');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');


var logger = require('morgan');


var app = express();

// Specifying the location of template/view files and 
// setting the view rendering engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Specifying the location for static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Loading routes
var routes = require('./routes/commonRoutes');
var users = require('./routes/userRoutes');

app.use('/', routes);
app.use('/users', users);

// Handle Sessions
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err,
			request: req,
			response: res
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {},
		request: req,
		response: res
	});
});

app.listen(3000);
//console.log(json(app));
console.log("Server is running on port 3000");

module.exports = app;