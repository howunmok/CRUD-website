/*  
    Student Name: Ho Wun Mok
    Student No.: 301237442
    Date:   October 26, 2022
    Filename: app.js
*/

//installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');

// modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');


// Database setup
let mongoose = require('mongoose');
let DB = require('./server/config/db');

// point mongoose to the DB URI
mongoose.connect(DB.URI);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error: '));
mongoDB.once('open', ()=> {
  console.log('connected to MongoDB...')
})

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let busContactRouter = require('./routes/busContact');

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

//setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}))

//initialize flash
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// passport user configuration

//create a User Model Instance
let userModel = require('./server/models/user');
//userModel has a User object inside of it
let User = userModel.User;

// implement a User Authentication Strategy
passport.use(User.createStrategy());

//serialize and deserialize the User info --> type of crypt
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
// create top level of URL
app.use('/business-contact', busContactRouter);

app.post('/contact', urlencodeParser, function (req, res){
  console.log(req.body);
});

module.exports = app;
