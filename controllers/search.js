const Place = require('../models/place');

exports.searchPlace = async function (req, res) {
    const datos = req.body;

    if(!datos.where || !datos.checkin || !datos.checkout || !datos.guests) {
        res.status(500).json({message: 'One of the following parameters is missing: where, checkin, checkout or guests.'});
    }else{
        let places;
        try{
            places = await Place.find().populate('bookings');
        }catch (e) {
            res.status(500).json({message: e.message});
        }
        const searchedPlaces = places.filter(p => {
            if(p.checkBooked(datos.checkin, datos.checkout)){
                return false;
            }else if(p.guests < datos.guests){
                return false;
            }else if(!p.city.toLowerCase().includes(datos.where.toLowerCase())){
                return false
            }else {
                return true;
            }
        });
        res.status(200).json(searchedPlaces);
    }
};