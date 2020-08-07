import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session'

import dotenv from 'dotenv';
dotenv.config();

import logger from 'morgan';

import config from './configs/mongoose.config';
config.initDB();
import { userService } from './services/user.service';

import {v4 as uuid_v4} from 'uuid';

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';


// Configure the local strategy for use by Passport.
passport.use('local', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'   
    },
    function verify(username, password, done) {
		const userDTO = {username, password};
		return userService.login(userDTO, done);
	})
);
// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, cb) {
	var sessionUser = { _id: user.id, username: user.username, email: user.email }
  	cb(null, sessionUser);
});

passport.deserializeUser(function(sessionUser, cb) {
	// The sessionUser object is different from the user mongoose collection
	// it's actually req.session.passport.user and comes from the session collection
	cb(null, sessionUser);
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
        return req.sessionID || uuid_v4();
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
app.use(function(req, res, next) {
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});


// Loading routes
import common_routes from './routes/common.route';
import user_routes from './routes/user.route';
import blog_routes from './routes/blog.route';

app.use('/', common_routes);
app.use('/users', user_routes);
app.use('/blogs', blog_routes);

// catch incorrect endpoint requests (404) and forward to error handler
app.use(function (req, res, next) {
	console.error("----------------------------");
	console.error(req.url);
	console.error(req.method);
	console.error(req.body);
	console.error("----------------------------");
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		console.log(err);
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