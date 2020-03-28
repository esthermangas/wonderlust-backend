const Booking = require('../models/booking');
const Place = require('../models/place');
const db = require('mongoose');
exports.index = async function (req, res) {
    try {
        const bookings = await Booking.find({});
        res.status(200).json(bookings);
    }catch (e) {
        res.status(500).json({message: e.message});
    }
};

exports.getOne = async function (req, res) {
    res.json(req.booking);
};

exports.createOne = async function (req, res) {
    let place;
    try {
        place = await Place.findOne({_id: req.body.place_id}).populate('bookings');
    }catch (e) {
        res.status(500).json({message: e.message});
    }
    const booking = new Booking ({...req.body, user_id: req.user._id});
    if(place === undefined || place === null){
        res.status(500).json({message: 'Place not found.'});
    } else if (place.checkBooked(req.body.startDate, req.body.endDate)){
        res.status(500).json({message: 'This place is already reserved for this dates'});
    } else {
        try{
            const newBooking = await booking.save();
            place.bookings.push(newBooking._id);
            const savePlace = await place.save();
            res.status(201).json(newBooking);
        }catch (e) {
            res.status(500).json({message: e.message});
        }
    }

};

exports.deleteOne = async function (req, res) {
    if (String(req.user._id) !== String(req.booking.user_id)) {
        res.status(403).json({message: 'You are not the owner of this booking.'});
    }else {
            try {
                await req.booking.remove();
                res.status(200).json({message: 'Your booking has been deleted.'});
            }catch (e) {
                res.status(500).json({message: e.message});
            }
    }
};

exports.updateOne = async function (req, res) {
    if (String(req.user._id) !== String(req.booking.user_id)) {
        res.status(403).json({message: 'You are not the owner of this booking.'});
    } else {
        Object.entries(req.body).forEach(([key, value]) => {
            if(req.booking[key] !== null && req.booking[key] !== undefined ) {
                req.booking[key] = value;
            }
        });
    }try {
        const updateBooking = await req.booking.save();
        res.status(200).json(updateBooking);
    }catch (e) {
        res.status(500).json({message: e.message});
    }
};

exports.getBooking = async function (req, res, next) {
    try{
        booking = await Booking.findById(req.params.id);
        if(booking === null) {
            res.status(404).json({messsage: "Booking not found."});
        }
    }catch (e) {
        res.status(500).json({message: e.message});
    }
    req.booking = booking;
    next();
};
