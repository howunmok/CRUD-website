/*  
    Student Name: Ho Wun Mok
    Student No.: 301237442
    Date:   October 8, 2022
    Filename: index.js
*/


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home'});
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home'});
});

/* GET about me page. */
router.get('/aboutme', function(req, res, next) {
  res.render('aboutme', { title: 'About Me'});
});

/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects'});
});

/* GET services page. */
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services'});
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact'});
});

/*let err;
if (err !== '/' || '/home' || '/aboutme' || '/projects'|| '/services' || '/contact') {
  router.get(err, function(req, res, next) {
    res.render('error', { title: 'Error'});
  });
}
*/

module.exports = router;
