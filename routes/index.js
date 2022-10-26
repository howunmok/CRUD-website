/*  
    Student Name: Ho Wun Mok
    Student No.: 301237442
    Date:   October 26, 2022
    Filename: index.js
*/


var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// Create the User Model instance
let userModel = require('../server/models/user')
let User = userModel.User; //alias

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', displayName: req.user ? req.user.displayName : ''});
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home', displayName: req.user ? req.user.displayName : ''});
});

/* GET about me page. */
router.get('/aboutme', function(req, res, next) {
  res.render('aboutme', { title: 'About Me', displayName: req.user ? req.user.displayName : ''});
});

/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects', displayName: req.user ? req.user.displayName : ''});
});

/* GET services page. */
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services', displayName: req.user ? req.user.displayName : ''});
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact', displayName: req.user ? req.user.displayName : ''});
});

/* GET Route for displaying the Login page */
router.get('/login', (req, res, next) => {
  // check if the user is already logged in
  if(!req.user)
  {
      res.render('auth/login', 
      {
          // when the user is there, then return the display name
          // otherwise display nothing 
          title: 'Login', 
          message: req.flash('loginMessage'), 
          displayName: req.user ? req.user.displayName : ''
      })
  } else {
      return res.redirect('/');
  }
});

/* POST Route for processing the Login page */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', 
  (err, user, info) => {
      // server err?
      if(err) {
          return next(err);
      } 
      // is there a user login error?
      if(!user) {
          req.flash('loginMessage', 'Authentication Error');
          return res.redirect('/login');
      }
      req.login(user, (err) => {
          // server error?
          if(err) {
              return next(err);
          }
          return res.redirect('/business-contact');
      });
  }) (req, res, next);
});

/* GET to perform userLogout */
router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
      if (err) {
        return next(err);
      };
  res.redirect('/');
  });
});

/* GET Route for displaying the Register page */
router.get('/register', (req, res, next) => {
  // check if the user is not already logged in
  if(!req.user) {
      res.render('auth/register', {
          title: 'Register', 
          message: req.flash('registerMessage'), 
          displayName: req.user ? req.user.displayName: ''
      });
  } else {
      return res.redirect('/');
  }
})

/* POST Route for processing the Register page */
router.post('/register', (req, res, next) => {
  // instantiate a user object
  let newUser = new User({
      username: req.body.username, 
      //password: req.body.password,
      email: req.body.email, 
      displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, (err) => {
      if(err) {
          console.log("Error: Inserting New User");
          if(err.name == "UserExistsError") {
              req.flash(
                  'redisterMessage', 
                  'Registration Error: User Already Exists!'
              );
              console.log('User Already Exists!')
          }
          return res.render('auth/register', {
              title: 'Register', 
              message: req.flash('registerMessage'), 
              displayName: req.user ? req.user.displayName: ''
          });
      } else {
          // if no error exists, then registration is successful

          // redirect the usr and authenticate them

          return passport.authenticate('local')(req, res, () => {
              res.redirect('/login')
          });
      }
  })
})




module.exports = router;
