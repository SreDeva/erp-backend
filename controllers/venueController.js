const venueModel = require("../models/venueModel")
const mongoose = require('mongoose');

//get all venue
exports.getAllVenue = async (req, res) => {
    const venue = await venueModel.find().sort({createdAT: -1})

    res.status(200).json(venue)
}

//get venue by id
exports.getVenueById = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ error: 'No such Venue' });
    }

        const venue = await venueModel.findById(id);

        if (!venue) {
            return res.status(404).json({ error: 'No such Student' });
        }

        res.status(200).json(venue);
}

//create venue
exports.createVenue = async (req, res) => {
    const { venueCode } = req.body;
    let emptyFields = []
    if(!venueCode){
        emptyFields.push('venueCode')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({ error: 'All field must be filled' })
    }
    try {
        const venue = await venueModel.create({venueCode})
        res.status(200).json(venue)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a venue
exports.deleteVenue = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'Invalid venue id' });
    }

    const venue = await venueModel.findOneAndDelete({_id: id})

    if (!venue) {
        return res.status(400).json({ error: 'No such venue' });
    }

    res.status(200).json(venue);
}

//update venue
exports.updateVenue = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such venue' });
    }

    const venue = await venueModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!venue) {
        return res.status(400).json({ error: 'No such venue' });
    }

    res.status(200).json(venue)
}