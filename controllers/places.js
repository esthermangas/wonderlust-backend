const Place = require('../models/place');

exports.index = async function (req, res) {
    try {
        const places = await Place.find({});
        res.status(200).json({places});
    } catch (e){
        res.status(500).json({message: e.message});
    }
};

exports.getOne = async function (req, res) {
    res.json(req.place);
};

exports.createOne = async function (req, res) {
    const place = new Place ({...req.body, user_id: req.user._id});
    try{
        const newPlace = await place.save();
        res.status(201).json(newPlace)
    }catch (e) {
        res.status(500).json({message: e.message});
    };
};

exports.updateOne = async function (req, res) {
    if(String(req.user._id) !== String(req.place.user_id)) {
        res.status(403).json({message: "You are not the owner of this place."})
    }else {
        Object.entries(req.body).forEach(([key, value]) =>{
            if(req.place[key] !== null && req.place[key] !== undefined){
                req.place[key] = value;
            }
        });
        try{
            const updatePlace = await req.place.save();
            res.status(200).json(updatePlace)
        }catch (e) {
            res.status(500).json({message: e.message});
        };
    }
};

exports.deleteOne = async function (req, res) {
    if(String(req.user._id) !== String(req.place.user_id)) {
        res.status(403).json({message: "You are not the owner of this place."})
    }else {
        try{
            await req.place.remove();
            res.status(200).json({message: "Your place has been deleted."});
        }catch (e) {
            res.status(500).json({message: e.message});
        }
    }
};

exports.getPlace = async function (req, res, next) {
    try{
        place = await Place.findOne({_id: req.params.id}).populate("bookings");
        if(place == null) {
            return res.status(404).json({message: "Place not found"});
        }
    }catch (e) {
        res.status(500).json({message: e.message});
    }
    req.place = place;
    next();
};