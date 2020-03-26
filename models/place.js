const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    description: {
        type: String,
        max: 250,
        required: true
    },
    guest: {
        type: Number,
        required: true
    },
    facilities: {
        type: Array,
        required: false
    },
    location: {
        type: Object,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

mongoose.set('useFindAndModify', false);
module.exports = mongoose.model('Place', PlaceSchema);