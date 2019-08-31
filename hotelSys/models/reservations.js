const mongoose = require('mongoose');

const reservationschema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   CustomerName: String,
   ReservationPrice: Number,
   ArrivalDate: Date,
   NoDays: Number

});

module.exports = mongoose.model('Reservations', reservationschema);