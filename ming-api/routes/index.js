var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var OAuth2Strategy = require('passport-oauth2').Strategy;
var router = express.Router();
var UsersController = require('../controllers/UsersController.js')

var baseUrl = process.env.BASE_URL || "http://localhost:8000";
router.get('/auth/status', function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send({ isLogin: false });
  }
}, function (req, res, next) {
  console.log("req", req.session)
  res.send({ isLogin: true, user: req.session.passport.user });
})

router.get('/auth/example',
  passport.authenticate('oauth2', { scope:
    ['offline_access', 'users.read', 'teams.read', 'bills.read', 'webhooks.create', 'webhooks.delete', 'creditors.read',' teams.categories.create']}));

router.get('/',
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/auth/status');
  });

router.post('/auth/local', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.redirect('/login')}
    if (!user) { return res.redirect('/login')}
    req.login(user, function(err) {
      if (err) { return res.redirect('/login')}
      res.send({ isLogin: true, user: req.session.passport.user });
    });
  })(req, res, next);
});


router.get('/auth/:provider', function(req, res, next) {
  passport.authenticate(req.params.provider,  function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.send('/login'); }
    })(req, res, next);
})

router.get('/auth/:provider/callback', function(req, res, next) {
  passport.authenticate(req.params.provider,  function(err, user, info) {
      console.log('err', err)
      console.log("user", user)
      if (err) { return res.redirect('/login') }
      if (!user) { return res.redirect('/login') }
        req.login(user, function(err) {
        if (err) { return next(err); }
        return res.redirect(`${baseUrl}/dashboard`);
      });
    })(req, res, next);
});

router.get('/logout',
  function(req, res){
    req.logout();
    console.log("logout", res.session)
    res.send({ isLogin: false });
  });



module.exports = router;
