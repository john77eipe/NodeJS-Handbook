import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session'

import dotenv from 'dotenv';
dotenv.config();

import logger from 'morgan';
import { userModel } from './daos/user.dao'

import config from './configs/mongoose.config';
config.initDB();

import uuid from 'uuid';

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';


// Configure the local strategy for use by Passport.
passport.use('local', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'   
    },
    function verify(username, password, done) {
		userModel.User
            .findOne({
				username: username
			}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false);
				}
				if (user.password != password) {
					return done(null, false);
				}
				return done(null, user);
			});
    }
));
// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
	dao.User.findById(id, function (err, user) {
	    if (err) { return cb(err); }
	    cb(null, user);
	});
});


const app = express();

// Specifying the location of template/view files and 
// setting the view rendering engines
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Specifying the location for static files
app.use(express.static(path.join(__dirname,
	 'public')));

app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	genid: (req) => {
		console.log('Inside session middleware genid function')
		console.log(`Request object sessionID from client: ${req.sessionID}`)
        return req.sessionID || uuid.v4();
	},
	store: new session.MemoryStore,
	secret: 'keyboard cat',
	resave: false,
    saveUninitialized: false
}));
// Passport
app.use(passport.initialize());
app.use(passport.session());


// Custom flash middleware -- https://gist.github.com/brianmacarthur/a4e3e0093d368aa8e423
app.use(function(req, res, next){
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});


// Loading routes
import common_routes from './routes/common.route';
import user_routes from './routes/user.route';

app.use('/', common_routes);
app.use('/users', user_routes);

// catch incorrect endpoint requests (404) and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		console.log(err);
		console.log(req);
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err.status
		});
	});
}

// production error handler
// no stacktraces leaked to user
// app.use(function (err, req, res, next) {
// 	res.status(err.status || 500);
// 	res.render('error', {
// 		message: err.message,
// 		error: {},
// 		request: req,
// 		response: res
// 	});
// });

export default app;