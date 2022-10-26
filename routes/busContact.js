/*  
    Student Name: Ho Wun Mok
    Student No.: 301237442
    Date:   October 26, 2022
    Filename: busContact.js
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to our business contact Model
let BusContact = require('../server/models/busContact');

function requireAuth(req, res, next) {
    // check if the user is logged in
    if(!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    next();
}


/* GET Route for the Business Contact page - READ Operation */
router.get('/', requireAuth, (req, res, next) => {
    BusContact.find((err, busContact) => {
        if(err) {
            return console.error(err);
        } else {
            res.render('busContact/list', { title: 'Business Contact',
            BusContact: busContact, displayName: req.user ? req.user.displayName: ''});
        }
    })
})

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth, (req, res, next) => {
    res.render('busContact/add', { title: 'Add Contact', displayName: req.user ? req.user.displayName: ''});
});

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth, (req, res, next) => {
    let newBusContact = BusContact({
        "contactname": req.body.name, 
        "contactno": req.body.number, 
        "email": req.body.email
    });

    BusContact.create(newBusContact, (err, BusContact) => {
        if(err) {
            console.log(err);
            res.end(err)
        } else {
            //refresh the business contact
            res.redirect('/business-contact');
        }
    })
});

/* GET Route for displaying the Update page - UPDATE Operation */
router.get('/update/:id', requireAuth, (req, res, next) => {
    let id = req.params.id;

    BusContact.findById(id, (err, contactUpdate) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('busContact/update', 
            {title: 'Update Contact', busContact: contactUpdate, 
            displayName: req.user ? req.user.displayName: ''})
        }
    });
});

/* POST Route for processing the Update page - UPDATE Operation */
router.post('/update/:id', requireAuth, (req, res, next) => {
    let id = req.params.id;

    let newBusContact = BusContact({
        "_id": id,
        "contactname": req.body.name, 
        "contactno": req.body.number, 
        "email": req.body.email
    });

    BusContact.updateOne({_id: id}, newBusContact, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/business-contact');
        }
    });
});

/* GET to perform Deletion - DELETE Operation */
router.get('/delete/:id', requireAuth, (req, res, next) => {
    let id = req.params.id;

    BusContact.remove({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/business-contact');
        }
    })
});

module.exports = router;