/*  
    Student Name: Ho Wun Mok
    Student No.: 301237442
    Date:   October 26, 2022
    Filename: user.js
*/

// require modules for the User Model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema(
    {
        username: {
            type: String, 
            default: '', 
            trim: true, 
            required: 'username is required'
        }, 
        /*
        password:{
            type: String, 
            default: "",
            trim: true,
            required: 'password is required'
        },
        */
        email: {
            type: String, 
            ddefault: '', 
            trim: true, 
            required: 'email address is required'
        },

        displayName: {
            type: String, 
            ddefault: '', 
            trim: true, 
            required: 'Display Name is required'
        }, 

        created: {
            type: Date, 
            ddefault: Date.now,
        },
        update: {
            type: Date, 
            ddefault: Date.now,
        }, 
    },
    {
        collection: "user"
    }
);

//configure options for User Model

let options = ({ missingPassword: 'Wrong / Missing Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);