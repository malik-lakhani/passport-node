var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./helpers/db.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var UsersController = require('./controllers/UsersController.js');
var FacebookStrategy = require('passport-facebook').Strategy;


require('dotenv').config()

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: 'cat', resave: true, saveUninitialized: true,
  cookie: { maxAge: 60000000 } }));

passport.use(new LocalStrategy({
	usernameField: 'email',
    passwordField: 'password'
	},
  	function(email, password, done) {
	    return UsersController.findByUser(email, password, 'local')
	    .then((user) => {
	      if (!user) {
	        return done(null, false, { message: 'Incorrect username.' });
	      }
	      return done(null, user);
	    })
	    .catch((err) => {
	      if (err) { return done(err); }
	    });
	  }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK,
    scope: ['email']
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log("profile", profile)
    return UsersController
      .findOrCreateByGoogle(profile)
      .then((response) => {
        done(null, response);
      })
      .catch((err) => {
        done(err, null);
      });
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['id','email', 'name', 'profileUrl', 'displayName']
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log("profile", profile)
  	return UsersController
      .findOrCreateByFacebook(profile)
      .then((response) => {
        done(null, response);
      })
      .catch((err) => {
        done(err, null);
      })
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
  })
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(user, cb) {
  return UsersController.findById(user.id, user.provider)
  .then((user) => {
    cb(null, user);
  })
  .catch((err) => {
    if (err) { return cb(err); }
  });
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
