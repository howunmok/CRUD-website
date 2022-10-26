/*  
    Student Name: Ho Wun Mok
    Student No.: 301237442
    Date:   October 26, 2022
    Filename: busContact.js
*/

let mongoose = require('mongoose');

// create a model class
let busContactListModel = mongoose.Schema({
    contactname: String, 
    contactno: String, 
    email: String, 
}, {
    collection: "busContact"
});

module.exports = mongoose.model('BusContact', busContactListModel);