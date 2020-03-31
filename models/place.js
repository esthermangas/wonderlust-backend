const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    description: {
        type: String,
        max: 250,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    facilities: {
        type: Array,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    bookings: [{type: mongoose.Schema.ObjectId, ref:'Booking'}]
});

PlaceSchema.methods.checkBooked = function(startDate, endDate) {
    let reserved = false;
    this.bookings.forEach( booking => {
        if(  !(booking.startDate > Date.parse(startDate) && booking.startDate > Date.parse(endDate) ) &&
             !(booking.endDate < Date.parse(startDate) && booking.endDate < Date.parse(endDate) )
        ){
            reserved=true;
        }
    });
    return reserved;
};

mongoose.set('useFindAndModify', false);
module.exports = mongoose.model('Place', PlaceSchema);