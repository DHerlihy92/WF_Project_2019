var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var assert = require('assert');
var ObjectId = require('mongoose').Types.ObjectId;



var url = 'mongodb://localhost:27017/hotelSys'

var Reservation = require('../models/reservations');


router.get('/addReservation', function(req, res, next){
    res.render('addReservation', { title: 'Add a new Reservation'});
});

router.get('/checkout', function(req, res, next){
    if(!req.session.user){
        const url = req.url;
       
        res.redirect('/users/login/?redirect=' + url);
      }else{
    
    var Reservation_id = req.query['id'];

    var resultArray = [];
    mongoose.connect(url, function(err, db){
        assert.equal(null, err);
        var cursor = db.collection('reservations').find({'_id': ObjectId(Reservation_id)});
        cursor.forEach(function(doc,err){
            assert.equal(null,err);
            resultArray.push(doc);
        }, function(){
            db.close();
            res.render('checkout', {title: 'Checkout', items: resultArray});
        });
    });
}
});


router.get('/upcomingReservations', function(req, res, next) {
    var resultArray = [];


    mongoose.connect(url, function(err, db){
        assert.equal(null, err);
        var cursor = db.collection('reservations').find();
        cursor.forEach(function(doc, err){
            assert.equal(null, err);
            resultArray.push(doc);
        }, function(){
            db.close();
            res.render('upcomingReservations', {items: resultArray, title: 'Upcoming Reservations'});
        });
    });
});

router.post('/addReservation', function(req, res, next){
    var item = {
        CustomerName:  req.body.CustomerName,
        ReservationPrice: req.body.ReservationPrice,
        ArrivalDate: req.body.ArrivalDate,
        NoDays: req.body.NoDays
    };

    mongoose.connect(url, function(err, db){
        db.collection('reservations').insertOne(item, function(err, result){
           // assert.equal(null, err);
            res.redirect('/reservations/addReservation');
           
            db.close();
        });
    });

});


module.exports = router;