const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema;

const reservationSchema = new mongoose.Schema({

    selectedDate: String,
    timeRange: Array,
    count: Number,
    productId: String,
},
    {timestamps: true});

module.exports = mongoose.model('Reservation', reservationSchema)