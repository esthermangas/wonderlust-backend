const mongoose = require('mongoose');


const BookingSchema = new mongoose.Schema({
    guest: {
        type: Number,
        required: true
    },
    place_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true
    }
});

mongoose.set('useFindAndModify', false);
module.exports = mongoose.model('Booking', BookingSchema);