/*  
    Student Name: Ho Wun Mok
    Student No.: 301237442
    Date:   October 8, 2022
    Filename: user.js
*/


var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
