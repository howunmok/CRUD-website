/*  
    Student Name: Ho Wun Mok
    Student No.: 301237442
    Date:   October 8, 2022
    Filename: app.js
*/

//installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

let urlencodeParser = bodyParser.urlencoded({ extended: false });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.urlencoded({extended:true}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/contact', urlencodeParser, function (req, res){
  console.log(req.body);
});


module.exports = app;
